// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasEmptyProperties(obj: any): boolean {
  return Object.values(obj).some((value) => {
    return value === "";
  });
}
