export default function calcOverallAssetCost(...args) {
    // this function sums all the values we pass as arguments and returns them
    // ideal to sum asset costs, but can also be implemented in our other kinds of calculators

    // add some parameter validation default return values
    // if (monthlyCost===null || numberOfMonths===null || monthlyCost===undefined || numberOfMonths===undefined ) {
    //     return NaN;
    // }

    // if (typeof monthlyCost !== 'number' || typeof numberOfMonths !== 'number') {
    //     return NaN;
    // }

    // if (monthlyCost<0 || numberOfMonths<0) {
    //     return NaN;
    // }

    if (args.length===0) {
        return NaN;
    }

    if (args.find((arg) => typeof arg !== 'number')) {
        return NaN;
    }

    if (args.find((arg) => arg<0)) {
        return NaN;
    }

    
    if (args.filter((arg) => arg===null).length>0) {
        return NaN;
    }

    if (args.filter((arg) => arg===undefined).length>0) {
        return NaN;
    }

      

    

    return [...args].reduce((a, b) => a + b,0);
}


