export function randomize(lowerBound, upperBound) {
  let lower = lowerBound, upper = upperBound;
  if (typeof upperBound === 'undefined') {
    upper = lowerBound;
    lower = 0;
  }

  return Math.random() * (upper - lower) + lower;
}
