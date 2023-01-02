/**
 *
 * @param {string} dateData
 * @returns
 */

function convertTime(dateData) {
  const date = new Date(dateData * 1000);

  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = '0' + date.getMinutes();

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes;

  return formattedTime;
}

export { convertTime };
