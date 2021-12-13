export const formatType = (type: string) => type.toUpperCase();
export const sizeToMb = (size: number) =>
  Math.round((100 * size) / 1000000) / 100;
export const formatName = (name: string) => {
  if (name.length > 20) return name.slice(0, 18).concat("...");
  return name;
};
