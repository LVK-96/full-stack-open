import React from "react";
import Part from "./Part";
import { CoursePart } from "./App";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(part =>
        <Part key={part.name} part={part} />
      )}
    </>
  );
};

export default Content;
