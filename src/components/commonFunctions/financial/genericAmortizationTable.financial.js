export default function genericAmortizationTable(interestRate, mortgagePaymentMontly, loanAmount, numberOfTerms) {
    // the list will contain dictionaries with the structure:
    // year, date, interest, principal, ending balance
    let  endingBalance, term;
    
    // save it in another variable for making the code easier to read
    endingBalance = loanAmount;

    // initiate amortization table
    let amortizationTable = [];
    
    // loop over the amortization table
    for (let i = 0; i < numberOfTerms; i++) {
        // assign value to the term
        term = i+1;
        
        // so we will compute the interest and the principal for all the 12 months of a year
        let currentMonthInterest = endingBalance*interestRate;
        let currentMonthPrincipal = mortgagePaymentMontly - currentMonthInterest;

        // substract values to ending balance
        endingBalance -= currentMonthPrincipal;

        // add more precission to the zero
        if (endingBalance < 0.05 && endingBalance>-0.05) {
            endingBalance = 0;
        }
                
        // add the values to the list
        amortizationTable.push({
            term: term,
            interest: currentMonthInterest,
            principal: currentMonthPrincipal,
            endingBalance: endingBalance
        });

        // advance date to the next month
    }

    // return value
    return amortizationTable;
}