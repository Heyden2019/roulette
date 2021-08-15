import React from "react";
import { CaseItem } from "../../App";
import { CaseCard } from "../CaseCard";
import "./case-content.scss";

const CASE_TITLE = "СОДЕРЖИМОЕ КЕЙСА";

interface CaseCard extends Omit<CaseItem, "price"> {}

interface CaseContentProps {
  cases: CaseCard[];
}

export const CaseContent: React.FC<CaseContentProps> = ({ cases }) => {
  return (
    <div className="case">
      <div className="case__title text-md text-bold">{CASE_TITLE}</div>
      <img className="case__decore" src="/images/decore.png" />
      <div className="case__content">
        {cases.map(({ color, image, model, name, id }) => (
          <div key={id} className="case__content-item">
            <CaseCard color={color} image={image} model={model} name={name} />
          </div>
        ))}
      </div>
    </div>
  );
};
