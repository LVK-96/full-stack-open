import React from "react";
import { CoursePart } from "./App";

interface TotalProps {
  courseParts: CoursePart[];
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
