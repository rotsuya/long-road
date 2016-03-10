'use strict';

const DAY = 24 * 60 * 60 * 1000;  // integer
const WEEK = DAY * 7;             // integer
const YEAR = 365.2425 * DAY;      // integer
const MONTH = YEAR / 12;          // integer

const ORDER = 2;

module.exports = function(ageValue, table) {
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
    switch (ORDER) {
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
    const params = getApproximateEquation(samples, ORDER);
    var y = 0;
    switch (ORDER) {
        case 1:
            y = params[0] * x + params[1];
            break;
        case 2:
            y = params[0] * Math.pow(x, 2) + params[1] * x + params[2];
            break;
    }
    return y;
};

function getSamples () {

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
