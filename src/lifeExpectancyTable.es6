'use strict';

const util = require('./util.es6');

const rawWeek = [
    [0, 80.79],
    [1, 80.83],
    [2, 80.82],
    [3, 80.80],
    [4, 80.79]
];
const rawMonth = [
    [2, 80.72],
    [3, 80.64],
    [6, 80.42]
];
const rawYear = [
    [1, 79.95],
    [2, 78.98],
    [3, 78.00],
    [4, 77.01],
    [5, 76.02],
    [6, 75.02],
    [7, 74.03],
    [8, 73.04],
    [9, 72.04],
    [10, 71.05],
    [11, 70.06],
    [12, 69.06],
    [13, 68.07],
    [14, 67.07],
    [15, 66.08],
    [16, 65.09],
    [17, 64.11],
    [18, 63.12],
    [19, 62.15],
    [20, 61.17],
    [21, 60.20],
    [22, 59.22],
    [23, 58.25],
    [24, 57.28],
    [25, 56.31],
    [26, 55.34],
    [27, 54.37],
    [28, 53.40],
    [29, 52.43],
    [30, 51.46],
    [31, 50.49],
    [32, 49.52],
    [33, 48.55],
    [34, 47.58],
    [35, 46.62],
    [36, 45.65],
    [37, 44.69],
    [38, 43.72],
    [39, 42.76],
    [40, 41.80],
    [41, 40.84],
    [42, 39.89],
    [43, 38.94],
    [44, 37.99],
    [45, 37.05],
    [46, 36.11],
    [47, 35.17],
    [48, 34.24],
    [49, 33.31],
    [50, 32.39],
    [51, 31.48],
    [52, 30.57],
    [53, 29.67],
    [54, 28.77],
    [55, 27.89],
    [56, 27.00],
    [57, 26.13],
    [58, 25.27],
    [59, 24.41],
    [60, 23.55],
    [61, 22.71],
    [62, 21.88],
    [63, 21.06],
    [64, 20.25],
    [65, 19.46],
    [66, 18.67],
    [67, 17.90],
    [68, 17.14],
    [69, 16.38],
    [70, 15.64],
    [71, 14.91],
    [72, 14.19],
    [73, 13.49],
    [74, 12.79],
    [75, 12.09],
    [76, 11.42],
    [77, 10.75],
    [78, 10.11],
    [79, 9.49],
    [80, 8.89],
    [81, 8.32],
    [82, 7.78],
    [83, 7.26],
    [84, 6.77],
    [85, 6.31],
    [86, 5.87],
    [87, 5.47],
    [88, 5.08],
    [89, 4.72],
    [90, 4.38],
    [91, 4.08],
    [92, 3.80],
    [93, 3.55],
    [94, 3.31],
    [95, 3.09],
    [96, 2.89],
    [97, 2.71],
    [98, 2.53],
    [99, 2.37],
    [100, 2.23],
    [101, 2.09],
    [102, 1.96],
    [103, 1.84],
    [104, 1.73],
    [105, 1.63]
];

const tableWeek = rawWeek.map((array) => {
    return [array[0] * util.WEEK, Math.round(array[1] * util.YEAR)];
});
const tableMonth = rawMonth.map((array) => {
    return [Math.round(array[0] * util.MONTH), Math.round(array[1] * util.YEAR)];
});
const tableYear = rawYear.map((array) => {
    return [Math.round(array[0] * util.YEAR), Math.round(array[1] * util.YEAR)];
});

module.exports = tableWeek.concat(tableMonth, tableYear);