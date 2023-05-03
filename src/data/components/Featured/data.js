const value = 1500;

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const amount = Number(value).toLocaleString('en', options);
