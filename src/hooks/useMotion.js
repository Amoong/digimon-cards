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
      gx: (newAttr.gx - prev.gx) / 20,
      gy: (newAttr.gy - prev.gy) / 20,
      go: (newAttr.go - prev.go) / 20,
    };

    if (isSetDone(delta)) {
      curFrameIdRef.current = null;
      return;
    }

    const next = {
      rx: prev.rx + delta.rx,
      ry: prev.ry + delta.ry,
      gx: prev.gx + delta.gx,
      gy: prev.gy + delta.gy,
      go: prev.go + delta.go,
    };

    setAttr(next);

    curFrameIdRef.current = requestAnimationFrame(() => frame(next));
  };

  return [attr, set];
}

export default useMotion;
