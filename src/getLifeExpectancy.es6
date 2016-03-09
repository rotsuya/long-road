'use strict';

const DAY = 24 * 60 * 60 * 1000;  // integer
const WEEK = DAY * 7;             // integer
const YEAR = 365.2425 * DAY;      // integer
const MONTH = YEAR / 12;          // integer

(function main () {
    const age = process.argv[2] - 0;
    if (Number.isNaN(age)) {
        // error
        return false;
    }
    for (let i = 0; i <= YEAR; i = i + DAY) {
        let ageValue = getLifeExpectancy(age * YEAR + i);
        let yearDay = getYearDayFromValue(ageValue);
        console.log(getStringFromYearDay(age, i / DAY) + ', ' + getStringFromYearDay(yearDay[0], yearDay[1]));
    }

    function getYearDayFromValue (value) {
        const year = Math.floor(value / YEAR);
        const day = Math.floor((value % YEAR) / DAY);
        return [year, day];
    }

    function getStringFromYearDay (_year, _day) {
        return _year + 'years ' + _day + 'days';
    }
})();

function getLifeExpectancy (ageValue) {
    // ソートされている前提
    const lifeTableWeek = [
        [0, 80.50],
        [1, 80.54],
        [2, 80.53],
        [3, 80.51],
        [4, 80.50]
    ];
    const lifeTableMonth = [
        [2, 80.43],
        [3, 80.36],
        [6, 80.14]
    ];
    const lifeTableYear = [
        [1, 79.67],
        [2, 78.70],
        [3, 77.71],
        [4, 76.73],
        [5, 75.74],
        [6, 74.74],
        [7, 73.75],
        [8, 72.76],
        [9, 71.77],
        [10, 70.77],
        [11, 69.78],
        [12, 68.78],
        [13, 67.79],
        [14, 66.80],
        [15, 65.81],
        [16, 64.82],
        [17, 63.83],
        [18, 62.85],
        [19, 61.87],
        [20, 60.90],
        [21, 59.92],
        [22, 58.96],
        [23, 57.99],
        [24, 57.02],
        [25, 56.05],
        [26, 55.09],
        [27, 54.12],
        [28, 53.15],
        [29, 52.18],
        [30, 51.21],
        [31, 50.25],
        [32, 49.28],
        [33, 48.31],
        [34, 47.35],
        [35, 46.38],
        [36, 45.41],
        [37, 44.45],
        [38, 43.48],
        [39, 42.52],
        [40, 41.57],
        [41, 40.61],
        [42, 39.66],
        [43, 38.71],
        [44, 37.76],
        [45, 36.82],
        [46, 35.89],
        [47, 34.95],
        [48, 34.02],
        [49, 33.10],
        [50, 32.18],
        [51, 31.27],
        [52, 30.36],
        [53, 29.46],
        [54, 28.57],
        [55, 27.68],
        [56, 26.80],
        [57, 25.93],
        [58, 25.07],
        [59, 24.21],
        [60, 23.36],
        [61, 22.52],
        [62, 21.70],
        [63, 20.88],
        [64, 20.08],
        [65, 19.29],
        [66, 18.51],
        [67, 17.74],
        [68, 16.98],
        [69, 16.23],
        [70, 15.49],
        [71, 14.76],
        [72, 14.04],
        [73, 13.33],
        [74, 12.63],
        [75, 11.94],
        [76, 11.27],
        [77, 10.62],
        [78, 9.99],
        [79, 9.37],
        [80, 8.79],
        [81, 8.22],
        [82, 7.69],
        [83, 7.18],
        [84, 6.70],
        [85, 6.24],
        [86, 5.82],
        [87, 5.41],
        [88, 5.03],
        [89, 4.68],
        [90, 4.35],
        [91, 4.04],
        [92, 3.76],
        [93, 3.49],
        [94, 3.25],
        [95, 3.02],
        [96, 2.81],
        [97, 2.61],
        [98, 2.43],
        [99, 2.25],
        [100, 2.09],
        [101, 1.95],
        [102, 1.81],
        [103, 1.68],
        [104, 1.56],
        [105, 1.45]
    ];
    const lifeTable = getLifeTable(lifeTableWeek, lifeTableMonth, lifeTableYear);
    return getApproximation(lifeTable, ageValue, 2)
}

function getApproximation (table, x, order) {
    const tableX = table.map((array) => {
        return array[0];
    });
    const tableLength = table.length;
    const index = tableX.indexOf(x);
    const minX = tableX[0];
    const maxX = tableX[tableLength - 1];
    if (x < minX || x > maxX) {
        // error
        return false;
    }
    if (index !== -1) {
        return table[index][1];
    }
    let indexRight = (table.findIndex((_x) => {
        return (_x > x);
    }));
    if (indexRight === -1) {
        indexRight = tableLength - 1;
    }
    var sampleLength;
    switch (order) {
        case 1:
            sampleLength = 2;
            break;
        case 2:
            sampleLength = 4;
            break;
        default:
            // error
            return;
    }
    const indexLeast = Math.min(Math.max(0, indexRight - (sampleLength / 2)), tableLength - sampleLength);
    const samples = table.slice(indexLeast, indexLeast + sampleLength);
    // indexRightが存在しないので-1
    const params = getApproximateEquation(samples, order);
    var y = 0;
    switch (order) {
        case 1:
            y = params[0] * x + params[1];
            break;
        case 2:
            y = params[0] * Math.pow(x, 2) + params[1] * x + params[2];
            break;
    }
    return y;
}

function getLifeTable (lifeTableWeek, lifeTableMonth, lifeTableYear) {
    const _lifeTableWeek = lifeTableWeek.map((array) => {
        return [array[0] * WEEK, Math.round(array[1] * YEAR)];
    });
    const _lifeTableMonth = lifeTableMonth.map((array) => {
        return [Math.round(array[0] * MONTH), Math.round(array[1] * YEAR)];
    });
    const _lifeTableYear = lifeTableYear.map((array) => {
        return [Math.round(array[0] * YEAR), Math.round(array[1] * YEAR)];
    });
    return _lifeTableWeek.concat(_lifeTableMonth, _lifeTableYear);
}

function getApproximateEquation (samples, order) {
    const n = samples.length;
    switch (order) {
        case 1:
            const intermediates1 = samples.reduce((prev, sample) => {
                const [x, y] = sample;
                return [prev[0] + x * y, prev[1] + x, prev[2] + y, prev[3] + Math.pow(x, 2)];
            }, [0, 0, 0, 0]);
            const [sigmaXY, sigmaX, sigmaY, sigmaXSquare] = intermediates1;
            const slope = (n * sigmaXY - sigmaX * sigmaY) / ((n * sigmaXSquare) - sigmaX * sigmaX);
            const intercept = (sigmaXSquare * sigmaY - sigmaXY * sigmaX) / ((n * sigmaXSquare) - sigmaX * sigmaX);
            const variance1 = samples.reduce((prev, sample) => {
                const [x, y] = sample;
                return prev + Math.pow(y - (slope * x + intercept), 2) / n;
            }, 0);
            const sd1 = Math.sqrt(variance1);
            return [slope, intercept, sd1];
        case 2:
            const intermediates2 = samples.reduce((prev, sample) => {
                const [x, y] = sample;
                return [prev[0] + x, prev[1] + Math.pow(x, 2), prev[2] + Math.pow(x, 3), prev[3] + Math.pow(x, 4),
                    prev[4] + Math.pow(x, 2) * y, prev[5] + x * y, prev[6] + y];
            }, [0, 0, 0, 0, 0, 0, 0]);
            const [s1, s2, s3, s4, z1, z2, z3] = intermediates2;
            const denominator = (n * s2 - Math.pow(s1, 2)) * s4 + s2 * (s1 * s3 - Math.pow(s2, 2)) + s3 * (s1 * s2 - n * s3);
            const a2 = ((s1 * s3 - Math.pow(s2, 2)) * z3 + (s1 * s2 - n * s3) * z2         + (n * s2 - Math.pow(s1, 2)) * z1 ) / denominator;
            const a1 = ((s2 * s3 - s1 * s4) * z3         + (n * s4 - Math.pow(s2, 2)) * z2 + (s1 * s2 - n * s3) * z1         ) / denominator;
            const a0 = ((s2 * s4 - Math.pow(s3, 2)) * z3 + (s2 * s3 - s1 * s4) * z2        + (s1 * s3 - Math.pow(s2, 2)) * z1) / denominator;
            const variance = samples.reduce((prev, sample) => {
                const [x, y] = sample;
                return prev + Math.pow(y - (a2 * Math.pow(x, 2) + a1 * x + a0), 2) / n;
            }, 0);
            const sd2 = Math.sqrt(variance);
            return [a2, a1, a0, sd2];
            break;
        defaut:
            return false;
    }
}
