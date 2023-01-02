/**
 *
 * @param {string} dateData
 * @param {boolean} year
 * @returns
 */

function convertDate(dateData, year = false) {
  const date = new Date(dateData * 1000);
  const dateSplit = date.toDateString().split(' ');
  if (year) {
    return `${dateSplit[1]} ${dateSplit[2]}, ${date.getFullYear()}`;
  } else {
    return `${dateSplit[1]} ${dateSplit[2]}`;
  }
}

export { convertDate };
