export function calcAssetMaintenanceCost(assetPrice, cost, costUnit) {
    // this function is generic and applies to asset maintenance cost property taxes, home insurance, PMI insurance, HOA fee, vehicle/equipment maintenance fee, etc and other costs. 
    // The return value is the absolute monthly maintenance cost. 
    // the cost unit can be either 'dollar' or 'percent', any other costUnit will return NaN
    // In case that the user wants a yearly cost, they multiply the return value by 12
    let result;
    if (costUnit==="percent") {
        result = assetPrice*cost/(100*12);
        return result;
        
    } else if (costUnit === "dollars") {
        result = cost/12;
        return result;
        
    } else {
        console.error("invalid property tax units, check your calculator form input");
        return NaN;
    }
};

export function calcAssetMaintenanceCostTotal(monthlyCost,numberOfMonths) {
    // this function returns a recurrent cost multiplied by the number of terms that we give to it.
    // it is commonly used in asset maintenance cost yearly, quarterly, quinquenialy or for the duration of the loan used to purchase of the asset
    return monthlyCost*numberOfMonths;
}

export function calcOverallAssetCost(...args) {
    // this function sums all the values we pass as arguments and returns them
    // ideal to sum asset costs, but can also be implemented in our other kinds of calculators
    return [...args].reduce((a, b) => a + b,0);
}