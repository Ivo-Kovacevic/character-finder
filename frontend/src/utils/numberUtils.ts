export const isBetween = (value: number, min: number, max: number) => min < value && value < max;

export const minutes = (time: number) => {
  const minutes = Math.floor(time / (1000 * 60));
  return `${minutes.toString().padStart(2, "0")}`;
};

export const seconds = (time: number) => {
  const seconds = Math.floor((time / 1000) % 60);
  return `${seconds.toString().padStart(2, "0")}`;
};

export const milliseconds = (time: number) => {
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${milliseconds.toString().padStart(2, "0")}`;
};
