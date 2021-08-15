import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CaseItem } from "../../App";
import { WINNER_ID } from "../../constant";
import { RouletteItem } from "../RouletteItem";
import "./roulette.scss";

const LOADING = "ОТКРЫВАЕТСЯ...";
const YOU_WIN = "ВЫ ВЫИГРАЛИ";
const WAIT = (Math.random() * 4 + 5) * 1000;

interface RouletteProps {
  items: CaseItem[];
}

export const Roulette: React.FC<RouletteProps> = ({ items }) => {
  const [winning, setWinnig] = useState<null | CaseItem>(null);
  const winner = useRef<string | null>(null);
  const roulette = useRef<HTMLDivElement | null>(null);

  const start = useCallback(
    (duration: number, fromWinner: number, isSlowdowned?: boolean) => {
      const currentDuration = Math.max(100, duration);
      const rouletteEl = roulette.current;
      if (rouletteEl) {
        const animation = rouletteEl.animate(
          // Смещаем
          [
            { transform: "translateX(0px)" },
            { transform: "translateX(-200px)" },
          ],
          {
            duration: currentDuration,
            iterations: 1,
          }
        );
        animation.onfinish = () => {
          if (rouletteEl) {
            // Удаляем первый элемент и переносим его в конец
            const firstEl = rouletteEl.children[0];
            rouletteEl.removeChild(firstEl);
            rouletteEl.appendChild(firstEl);

            if (winner.current) {
              // 2. Холостая прокрутка закончилась
              if (
                !isSlowdowned &&
                rouletteEl.children[3].getAttribute("data-id") ===
                  winner.current
              ) {
                // 4. Попали на выигрышный элемент, разрешаем замедление
                return start(currentDuration, fromWinner, true);
              }

              if (!isSlowdowned) {
                // 3. Не попали на выйгрышный элемент, движемся быстро
                return start(currentDuration, fromWinner, isSlowdowned);
              }

              if (fromWinner > 8) {
                // 5. До конца далеко, скорость не сбавляем
                fromWinner -= 1;

                return start(currentDuration, fromWinner, isSlowdowned);
              }

              if (
                rouletteEl.children[3].getAttribute("data-id") ===
                winner.current
              ) {
                // 7. Попали на выйгрышный элемент и скорость уже медленная
                // Точка выхода
                const winning = items.find(({ id }) => id === WINNER_ID)!;
                return setWinnig(winning);
              }

              // 6. Сбавляем скорость
              return start(currentDuration + 75, fromWinner, isSlowdowned);
            }

            // 1. Холостая прокрутка
            return start(currentDuration - 25, fromWinner, isSlowdowned);
          }
        };
      }
    },
    [items]
  );

  useEffect(() => {
    if (items.length) {
      setTimeout(() => {
        winner.current = WINNER_ID;
      }, WAIT);
      start(500, items.length);
    }
  }, [items, start]);

  return (
    <div className="roulette">
      <img src="/images/spr.png" alt="spr" className="roulette__image" />
      <div className="roulette__main-wrapper">
        <div className="roulette__cursor-wrapper">
          <img
            src="images/cursor.png"
            alt="cursor"
            className="roulette__cursor"
          />
        </div>
        <div className="roulette__items-wrapper">
          <div className="roulette__items-container">
            <div className="roulette__items" ref={roulette}>
              {items.map(({ color, id, image, model, name, price }) => (
                <div key={id} data-id={id}>
                  <RouletteItem
                    color={color}
                    image={image}
                    model={model}
                    name={name}
                    price={price}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx("roulette__status text-lg", {
          "extra-padding": !winning,
        })}
      >
        {winning ? YOU_WIN : LOADING}
      </div>
      {winning && (
        <div className="roulette__win-card">
          <RouletteItem
            color={winning.color}
            image={winning.image}
            model={winning.model}
            name={winning.name}
            price={winning.price}
          />
        </div>
      )}
    </div>
  );
};
