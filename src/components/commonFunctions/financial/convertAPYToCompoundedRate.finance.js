export default function convertAPYToCompoundedRate(apy, compoundingsPerYear) {
    // convert annual percentage yield to compounded rate
    // procedure taken from the following link: https://www.sapling.com/6602718/convert-apy-monthly-rate

    if (apy === null || compoundingsPerYear === null) {
        return NaN;
    };

    if (apy === undefined || compoundingsPerYear === undefined) {
        return NaN;
    };

    if (apy < 0 || compoundingsPerYear < 0) {
        return NaN;
    };

    if (apy === 0 || compoundingsPerYear === 0) {
        return 0;
    };

    if (typeof apy != 'number' || typeof compoundingsPerYear != 'number') {
        return NaN;
    };

    // divide apy by 10 and sum 1 
    let compoundedRate = apy/100 + 1;

    // raise compoundedRate to the power of 1/compoundingsPerYear and subtract 1
    compoundedRate = Math.pow(compoundedRate, 1/compoundingsPerYear) - 1;

    // multiply the compoundedRate by 100 to get the compounded rate as a percentage
    // compoundedRate = compoundedRate * 100;

    // return the compounded rate result
    return compoundedRate;

};