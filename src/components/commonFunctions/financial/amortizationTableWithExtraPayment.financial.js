export default function amortizationTableWithExtraPayment(interestRate, mortgagePaymentMontly, loanAmount, numberOfTerms, extraPaymentAnual, extraPaymentMontly) {
    // the list will contain dictionaries with the structure:
    // year, date, interest, principal, ending balance
    let  endingBalance, term;
    
    // save it in another variable for making the code easier to read
    endingBalance = loanAmount;

    // initiate amortization table
    let amortizationTable = [];

    // console.log("interest interestRate",interestRate, "mortgagePaymentMontly", mortgagePaymentMontly, "loanAmount", loanAmount, "numberOfTerms", numberOfTerms, "extraPaymentAnual", extraPaymentAnual, "extraPaymentMontly", extraPaymentMontly);

    // loop over the amortization table
    for (let i = 0; i < numberOfTerms; i++) {
        // assign value to the term
        term = i+1;
        
        // so we will compute the interest and the principal for all the 12 months of a year
        let currentMonthInterest = endingBalance*interestRate;

        // limit the current month principal to nothing more than the current balance
        let currentMonthPrincipal = mortgagePaymentMontly - currentMonthInterest <= endingBalance ? mortgagePaymentMontly - currentMonthInterest + extraPaymentMontly : endingBalance;

        // substract normal principal payment to ending balance and extra monthly repayments
        if (currentMonthPrincipal <= endingBalance) {
            // if monthly repayment is smaller than balance, add extra payment to principal an substract to the ending balance
            // currentMonthPrincipal += extraPaymentMontly;
            endingBalance -= currentMonthPrincipal ;
        } else {
            // if monthly payment bigger than balance, only add the remaining to the principal payment for current month
            currentMonthPrincipal += endingBalance;
            // ending balance is zero
            endingBalance = 0;
        }

        // substract anual balance
        if (term % 12 == 0 && extraPaymentAnual <= endingBalance) {
            // if end of the year and the anual repayment is smaller than balance, add extra payment to principal an substract to the ending balance
            currentMonthPrincipal += extraPaymentAnual;
            endingBalance -=  extraPaymentAnual;
        } else if (term % 12 == 0 && extraPaymentAnual > endingBalance) {
            // if end of year and anual payment bigger than balance, only add the remaining to the principal payment for current month
            currentMonthPrincipal += endingBalance;
            // ending balance is zero
            endingBalance = 0;
        }

        
                
        // add the values to the list
        amortizationTable.push({
            term: term,
            interest: currentMonthInterest,
            principal: currentMonthPrincipal,
            endingBalance: endingBalance
        });

        // if already paid, break
        if (endingBalance <= 0) {
            break;
        }

        // advance date to the next month
    }

    // return value
    return amortizationTable;
};