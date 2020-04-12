import React from "react";
import { PartInfo } from "./types";

interface TotalProps {
  courseParts: PartInfo[];
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  const total = courseParts.reduce((accumulator, part) => accumulator + part.exerciseCount, 0);
  return (
    <p>
      Number of exercises {" "} {total}
    </p>
  );
};

export default Total;
