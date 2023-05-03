export const tableRows = (width, height) => {
  let row = 10;

  if (width < 900 && height < 1250) {
    row = 20;
  } else if (width < 921 && height > 1347) {
    row = 25;
  } else if (width < 1347 && height < 921) {
    row = 15;
  } else if (height > 1250) {
    row = 20;
  } else if (height > 1099) {
    row = 15;
  }

  return row;
};
