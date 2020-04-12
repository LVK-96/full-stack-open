import React from "react";
import { PartInfo } from "./types";

interface ContentProps {
  courseParts: PartInfo[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(part =>
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      )}
    </>
  );
};

export default Content;
