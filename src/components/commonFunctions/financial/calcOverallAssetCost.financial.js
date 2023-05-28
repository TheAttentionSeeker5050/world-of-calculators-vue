export default function calcOverallAssetCost(...args) {
    // this function sums all the values we pass as arguments and returns them
    // ideal to sum asset costs, but can also be implemented in our other kinds of calculators
    return [...args].reduce((a, b) => a + b,0);
}


