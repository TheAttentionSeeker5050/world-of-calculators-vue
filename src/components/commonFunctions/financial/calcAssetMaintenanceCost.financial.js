export default function calcAssetMaintenanceCost(assetPrice, cost, costUnit) {
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
        // console.error("invalid property tax units, check your calculator form input");
        return NaN;
    }
};