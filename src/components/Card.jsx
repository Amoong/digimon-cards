import { useRef, useState } from "react";
import { makeCssVariables } from "../utils";
import "./Card.css";

const initialAttr = {
  rx: 0,
  ry: 0,
};

function Card({ data: { imageSrc, name } }) {
  const cardRef = useRef(null);

  const [motionAttr, setMotionAttr] = useState(initialAttr);

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

    setMotionAttr((prev) => ({
      ...prev,
      rx: `${degree.x}`,
      ry: `${degree.y}`,
    }));
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
          </div>
        </button>
      </div>
    </div>
  );
}

export default Card;
