export function randomNumber(min: number = 0, max: number = 100) {
  return Math.floor(Math.random() * max + min);
}

export function randomArrNumber(length: number = 20, min: number = 0, max: number = 100) {
  return Array.from({ length }, () => Math.floor(Math.random() * max + min));
}
