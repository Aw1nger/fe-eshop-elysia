export const itWillFit = (
  text: string,
  ref: React.RefObject<
    | HTMLDivElement
    | HTMLParagraphElement
    | HTMLSpanElement
    | HTMLHeadingElement
    | null
  >,
  fontSize: string = "16px",
  fontFamily: string = "Roboto",
  fontWeight: number = 400,
): boolean => {
  if (!ref.current) return false;
  const refWidth = ref.current.offsetWidth;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;

  return text.split(" ").some((word) => {
    const metrics = ctx.measureText(word);
    const wordWidth = metrics.width;
    if (wordWidth > refWidth) return true;
    return false;
  });
};
