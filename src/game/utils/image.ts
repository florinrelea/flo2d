export function createImage(src: string) {
  const i = new Image()
  i.src = src
  return i
}