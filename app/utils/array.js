export function minBy(arr, fn) {
  if (arr.length === 0) {
    return null
  }
  if (arr.length === 1) {
    return arr[0]
  }

  let lowestVal = fn(arr[0])
  let lowest = arr[0]
  for(let i = 1; i < arr.length; i++) {
    let val = fn(arr[i])
    if (val < lowestVal) {
      lowestVal = val
      lowest = arr[i]
    }
  }

  return lowest
}
