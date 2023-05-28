export default function findRemainingDebtInAmortizationTableByTerm(remainingMonths, remainingYears, amortizationTable) {
    // returns the remaining balance based on the amortization table

    // using the remaining months and years, calculate the remaining payments
    let remainingNumberOfPayments = remainingMonths + remainingYears*12;

    // get the current index of the payment in the amortization table (indexes start with 0 on programming, so there is no need to add 1 to the result)
    let currentIndexInAmortizationTable = amortizationTable.length - remainingNumberOfPayments;
    
    // find the remaining balance
    let remainingBalance = amortizationTable[currentIndexInAmortizationTable].endingBalance;
    
    // return value
    return remainingBalance;

};