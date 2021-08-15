import React from "react";
import { CaseItem } from "../../App";
import { useLineStyle } from "../../hooks/useLineStyle";
import "./case-card.scss";
import { Dots } from "./Dots";

interface CaseCardProps extends Omit<CaseItem, "id" | "price"> {}

export const CaseCard: React.FC<CaseCardProps> = ({
  color,
  model,
  name,
  image,
}) => {
  const { lineStyle, cardStyle } = useLineStyle(color, "#232531");

  return (
    <div className="case-card" style={cardStyle}>
      <div className="case-card__line" style={lineStyle} />
      <div className="case-card__dots">
        <Dots color={color} />
      </div>
      <div className="case-card__background-image-wrapper image-wrapper">
        <img
          src="/images/case-item-logo.png"
          alt="model"
          className="case-card__background-image"
        />
      </div>
      <div className="case-card__image-wrapper image-wrapper">
        <img
          src={`/images/weapons/${image}`}
          alt={model}
          className="case-card__image"
        />
      </div>
      <div className="case-card__model text-xs">{model}</div>
      <div className="case-card__name text-xs">{name}</div>
    </div>
  );
};
