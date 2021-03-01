import numeral from 'numeral';

export const sortData = (data, property, order) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (order === 'ASC') {
      if (a[property] > b[property]) {
        return 1;
      } else if (a[property] < b[property]) {
        return -1;
      } else {
        return 0;
      }
    } else if (order === 'DESC') {
      if (a[property] > b[property]) {
        return -1;
      } else if (a[property] < b[property]) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';
