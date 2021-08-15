import React, { useEffect, useState } from "react";
import { CaseContent } from "./components/CaseContent";
import { Roulette } from "./components/Roulette";
import "./scss/globals.scss";
import "./scss/typography.scss";

export interface CaseItem {
  name: string;
  model: string;
  color: string;
  image: string;
  id: string;
  price: number;
}

function App() {
  const [cases, setCases] = useState<CaseItem[]>([]);

  useEffect(() => {
    const asyncFn = async () => {
      const cards = (await (
        await fetch("/data/items.json", {
          method: "GET",
        })
      ).json()) as unknown as CaseItem[];

      setCases(cards);
    };

    asyncFn();
  }, []);

  return (
    <div>
      <Roulette items={cases} />
      <CaseContent cases={cases} />
    </div>
  );
}

export default App;
