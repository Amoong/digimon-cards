import { useRef, useState } from "react";

const isSetDone = (delta) => {
  const smallNum = 0.05;
  return Math.abs(delta.rx) <= smallNum && Math.abs(delta.ry) <= smallNum;
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

    const delta = {
      rx: (newAttr.rx - prev.rx) / 20,
      ry: (newAttr.ry - prev.ry) / 20,
    };

    if (isSetDone(delta)) {
      curFrameIdRef.current = null;
      return;
    }

    const next = {
      rx: prev.rx + delta.rx,
      ry: prev.ry + delta.ry,
    };

    setAttr(next);

    curFrameIdRef.current = requestAnimationFrame(() => frame(next));
  };

  return [attr, set];
}

export default useMotion;
