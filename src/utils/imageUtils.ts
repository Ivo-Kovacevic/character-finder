export const updateImageSize = (
  imageRef: React.MutableRefObject<HTMLImageElement | null>,
  setImageSize: React.Dispatch<
    React.SetStateAction<{
      height: number;
      width: number;
    }>
  >
) => {
  if (imageRef.current) {
    const rect = imageRef.current.getBoundingClientRect();
    setImageSize({ height: rect.height, width: rect.width });
  }
};
