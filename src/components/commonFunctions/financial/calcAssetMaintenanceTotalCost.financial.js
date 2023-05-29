export default function calcAssetMaintenanceTotalCost(monthlyCost,numberOfMonths) {
    // this function returns a recurrent cost multiplied by the number of terms that we give to it.
    // it is commonly used in asset maintenance cost yearly, quarterly, quinquenialy or for the duration of the loan used to purchase of the asset

    // add some parameter validation default return values
    // if (monthlyCost===null || numberOfMonths===null || numberOfMonths===0 || monthlyCost===undefined || numberOfMonths===undefined ) {

    // }

    if (typeof monthlyCost !== 'number' || typeof numberOfMonths !== 'number') {
        return NaN;
    }
    
    if (monthlyCost<0 || numberOfMonths<0) {
        return NaN;
    }

    if (monthlyCost===0 ) {
        return 0;
    }

    if (numberOfMonths===0 ) {
        return NaN;
    }

    // return operation
    return monthlyCost*numberOfMonths;
}