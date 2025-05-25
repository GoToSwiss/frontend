export default function computeCorrelationMatrix(data: any[], keys: string[]) {
  const matrix = [];

  for (let i = 0; i < keys.length; i += 1) {
    for (let j = 0; j < keys.length; j += 1) {
      const xi = data.map((d) => +d[keys[i]]);
      const yi = data.map((d) => +d[keys[j]]);
      const corr = pearsonCorrelation(xi, yi);
      matrix.push({
        x: keys[i],
        y: keys[j],
        value: +corr.toFixed(2),
      });
    }
  }

  return matrix;
}

function pearsonCorrelation(x: any[], y: any[]) {
  const n = x.length;
  const avgX = x.reduce((a: number, b: number) => a + b, 0) / n;
  const avgY = y.reduce((acc: number, val: number) => acc + val, 0) / n;

  const numerator = x.reduce(
    (acc: number, val: number, i: number) => acc + (val - avgX) * (y[i] - avgY),
    0,
  );
  const denominator = Math.sqrt(
    x.reduce((acc: number, val: number) => acc + (val - avgX) ** 2, 0) *
      y.reduce((acc: number, val: number, i: number) => acc + (y[i] - avgY) ** 2, 0),
  );

  return denominator === 0 ? 0 : numerator / denominator;
}
