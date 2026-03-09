export function calculateAverage(data) {
  const sum = data.reduce((total, item) => total + item.value, 0);
  return sum / data.length;
}

export function calculateMax(data) {
  return Math.max(...data.map(d => d.value));
}

export function calculateMin(data) {
  return Math.min(...data.map(d => d.value));
}