import React from "react";
import { CoursePart } from "./App";
import { assertNever } from "./utils";

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  let partInfo;
  switch (part.name) {
    case "Fundamentals":
      partInfo = `${part.name} ${part.exerciseCount} ${part.description}`;
      break;
    case "Using props to pass data":
      partInfo = `${part.name} ${part.exerciseCount} ${part.groupProjectCount}`;
      break;
    case "Deeper type usage":
      partInfo = `${part.name} ${part.exerciseCount} ${part.description} ${part.exerciseSubmissionLink}`;
      break;
    case "asdf":
      partInfo = `${part.name} ${part.exerciseCount} ${part.description}`;
      break;
    default:
      return assertNever(part);
  }

  return (
    <p>
      {partInfo}
    </p>
  );
};

export default Part;
