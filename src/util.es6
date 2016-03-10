const DAY = 24 * 60 * 60 * 1000;  // integer
const WEEK = DAY * 7;             // integer
const YEAR = 365.2425 * DAY;      // integer
const MONTH = YEAR / 12;          // integer

module.exports = {DAY, WEEK, YEAR, MONTH};