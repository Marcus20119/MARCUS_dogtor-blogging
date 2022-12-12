/**
 *
 * @param {string} dateData
 * @param {boolean} year
 * @returns
 */

function convertDate(dateData, year = false) {
  const date = new Date(dateData * 1000).toDateString().split(' ');
  if (year) {
    return `${date[1]} ${date[2]} ${date[3]}`;
  } else {
    return `${date[1]} ${date[2]}`;
  }
}

export { convertDate };
