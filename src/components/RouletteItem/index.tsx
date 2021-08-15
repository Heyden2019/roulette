import React from "react";
import { CaseItem } from "../../App";
import { useLineStyle } from "../../hooks/useLineStyle";
import "./roulette-item.scss";

export interface RouletteItemProps extends Omit<CaseItem, "id"> {}

export const RouletteItem: React.FC<RouletteItemProps> = ({
  color,
  model,
  name,
  image,
  price,
}) => {
  const { lineStyle, cardStyle } = useLineStyle(color, "#18181E");

  return (
    <div className="roulette-item" style={cardStyle}>
      <div className="roulette-item__line" style={lineStyle} />
      <div className="roulette-item__background-image-wrapper">
        <img
          src="/images/case-item-logo.png"
          alt="model"
          className="roulette-item__background-image"
        />
      </div>
      <div className="roulette-item__price text-sm text-bold">{`${price} P`}</div>
      <div className="roulette-item__image-wrapper">
        <img
          src={`/images/weapons/${image}`}
          alt={model}
          className="roulette-item__image"
        />
      </div>
      <div className="roulette-item__model text-sm">{model}</div>
      <div className="roulette-item__name text-sm">{name}</div>
    </div>
  );
};
