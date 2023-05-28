export default function calcAssetMaintenanceTotalCost(monthlyCost,numberOfMonths) {
    // this function returns a recurrent cost multiplied by the number of terms that we give to it.
    // it is commonly used in asset maintenance cost yearly, quarterly, quinquenialy or for the duration of the loan used to purchase of the asset
    return monthlyCost*numberOfMonths;
}