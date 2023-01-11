import { useRef, useState } from "react";

const isSetDone = (delta) => {
  const smallNum = 0.05;
  return Object.values(delta).every((attr) => attr <= smallNum);
};

function useMotion(initialAttr) {
  const curFrameIdRef = useRef(null);
  const newAttrRef = useRef(initialAttr);

  const [attr, setAttr] = useState(initialAttr);

  const set = (newAttr) => {
    if (curFrameIdRef.current) {
      cancelAnimationFrame(curFrameIdRef);
      curFrameIdRef.current = null;
    }

    newAttrRef.current = newAttr;
    curFrameIdRef.current = requestAnimationFrame(() => frame(attr));
  };

  const frame = (prev) => {
    const newAttr = newAttrRef.current;

    const delta = Object.keys(newAttr).reduce((acc, key) => {
      acc[key] = (newAttr[key] - prev[key]) / 20;
      return acc;
    }, {});

    if (isSetDone(delta)) {
      curFrameIdRef.current = null;
      return;
    }

    const next = Object.keys(delta).reduce((acc, key) => {
      acc[key] = delta[key] + prev[key];
      return acc;
    }, {});

    setAttr(next);

    curFrameIdRef.current = requestAnimationFrame(() => frame(next));
  };

  return [attr, set];
}

export default useMotion;
