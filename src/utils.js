export const makeCssVariables = (motionAttr) => ({
  "--rx": `${motionAttr.rx}deg`,
  "--ry": `${motionAttr.ry}deg`,
  "--gx": `${motionAttr.gx}%`,
  "--gy": `${motionAttr.gy}%`,
  "--go": motionAttr.go,
});
