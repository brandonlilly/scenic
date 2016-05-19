export function times(num, callback) {
  let results = []
  for(let i = 0; i < num; i++) {
    results.push(callback(i))
  }
  return results
}
