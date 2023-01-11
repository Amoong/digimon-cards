import { useRef } from "react";
import useMotion from "../hooks/useMotion";
import { makeCssVariables } from "../utils";

import Glare from "./Glare";

import "./Card.css";

const initialAttr = {
  rx: 0,
  ry: 0,
  gx: 50,
  gy: 50,
  go: 0,
};

function Card({ data: { imageSrc, name } }) {
  const cardRef = useRef(null);

  const [motionAttr, setMotionAttr] = useMotion(initialAttr);

  const interactStart = (e) => {
    if (e.type === "touchmove") {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    const absolute = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const percent = {
      x: Math.round((absolute.x / rect.width) * 100),
      y: Math.round((absolute.y / rect.height) * 100),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    const degree = {
      x: -center.x / 3,
      y: center.y / 4,
    };

    setMotionAttr({
      rx: degree.x,
      ry: degree.y,
      gx: percent.x,
      gy: percent.y,
      go: 1,
    });
  };

  const interactEnd = () => {
    setMotionAttr(initialAttr);
  };

  return (
    <div className="Card" style={makeCssVariables(motionAttr)} ref={cardRef}>
      <div className="Card__translater">
        <button
          className="Card__rotator"
          onPointerMove={interactStart}
          onMouseOut={interactEnd}
        >
          <img
            className="Card__back"
            src="/back.png"
            alt="Back of digimon card"
          />
          <div className="Card__front">
            <img src={imageSrc} alt={name} />
            <Glare />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Card;
