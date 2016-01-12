var DAY = 24 * 60 * 60 * 1000;  // integer
var WEEK = DAY * 7;             // integer
var YEAR = 365.2425 * DAY;      // integer
var MONTH = YEAR / 12;          // integer

(function main () {
    var age = process.argv[2] - 0;
    if (Number.isNaN(age)) {
        return false;
    }
    var dateValue = 0;
    var yearDay = [0, 0];
    for (var i = 0; i <= YEAR; i = i + DAY) {
        dateValue = getLifeExpectancy(age * YEAR + i);
        yearDay = getYearDayFromDateValue(dateValue);
        console.log(getStringFromYearDay(age, i / DAY) + ', ' + getStringFromYearDay(yearDay[0], yearDay[1]));
    }

    function getYearDayFromDateValue (_dateValue) {
        var year = Math.floor(_dateValue / YEAR);
        var day = Math.floor((_dateValue % YEAR) / DAY);
        return [year, day];
    }

    function getStringFromYearDay (_year, _day) {
        return _year + 'years ' + _day + 'days';
    }
})();

function getLifeExpectancy (currentAge) {
    // ソートされている前提
    var lifeTableWeek = [
        [0, 80.50],
        [1, 80.54],
        [2, 80.53],
        [3, 80.51],
        [4, 80.50]
    ];
    var lifeTableMonth = [
        [2, 80.43],
        [3, 80.36],
        [6, 80.14]
    ];
    var lifeTableYear = [
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
    var lifeTable = getLifeTable(lifeTableWeek, lifeTableMonth, lifeTableYear);
    return getApproximation(lifeTable, currentAge)
}

function getApproximation (table, x) {
    var knownX = table.map(function firstItem (array) {
        return array[0];
    });
    var index = knownX.indexOf(x);
    if (index !== -1) {
        return table[index][1];
    }
    var indexRight = knownX.findIndex(function (_x) {
        return (_x > x);
    });
    var xRight = knownX[indexRight];
    var xLeft = knownX[indexRight - 1];
    var yRight = table[indexRight][1];
    var yLeft = table[indexRight - 1][1];
    return Math.round((yLeft * (xRight - x) + yRight * (x - xLeft)) / (xRight - xLeft));
}

function getLifeTable (lifeTableWeek, lifeTableMonth, lifeTableYear) {
    var _lifeTableWeek = lifeTableWeek.map(function (array) {
        return [array[0] * WEEK, Math.round(array[1] * YEAR)];
    });
    var _lifeTableMonth = lifeTableMonth.map(function (array) {
        return [Math.round(array[0] * MONTH), Math.round(array[1] * YEAR)];
    });
    var _lifeTableYear = lifeTableYear.map(function (array) {
        return [Math.round(array[0] * YEAR), Math.round(array[1] * YEAR)];
    });
    return _lifeTableWeek.concat(_lifeTableMonth, _lifeTableYear);
}

function getLeastSquares (samples) {
    var n = samples.length;
    var sigmaXY = 0;
    var sigmaX = 0;
    var sigmaY = 0;
    var sigmaXSquare = 0;
    var x;
    var y;
    for (var i = 0; i < n; i++) {
        x = samples[i][0];
        y = samples[i][1];
        sigmaXY += x * y;
        sigmaX += x;
        sigmaY += y;
        sigmaXSquare += x * x;
    }
    var slope = (n * sigmaXY - sigmaX * sigmaY) / ((n * sigmaXSquare) - sigmaX * sigmaX);
    var intercept = (sigmaXSquare * sigmaY - sigmaXY * sigmaX) / ((n * sigmaXSquare) - sigmaX * sigmaX);
    var variance = 0;
    for (var i = 0; i < n; i++) {
        x = samples[i][0];
        y = samples[i][1];
        variance += Math.pow(y - (slope * x + intercept), 2)
    }
    variance /= n;
    var sD = Math.sqrt(variance);
    return [slope, intercept, sD];
}
