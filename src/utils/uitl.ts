export function stringSplice(str: string, index: number, count: number, addedStr: string) {
  return str.slice(0, index) + addedStr + str.slice(index + count);
}
