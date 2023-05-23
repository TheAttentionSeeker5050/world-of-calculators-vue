export function calcLoanRecurrentPayment(loanAmount, interestRate,numberOfPayments) {
    // this function returns a generic loan recurrent payment
    // the interest rate must be as a fraction and be the the rate effective on each payment, like monthly rate, or bi-weekly, but remember that the  term unit must match the number of payments as well
    let result = loanAmount*(interestRate*Math.pow(1+interestRate,numberOfPayments)/(Math.pow(1+interestRate,numberOfPayments)-1));
    return result;
};

export function splitInterestRate(interestRate, splitByNumber) {
    // this function splits the interest rate into splitByNumber (or n) parts
    // the interest rate arguments is in percent values, but we will transform it into decimal. the return value will be easier to make calculations on
    return interestRate/(splitByNumber*100);
    
}

export function genericAmortizationTable(interestRate, mortgagePaymentMontly, loanAmount, numberOfTerms) {
    // the list will contain dictionaries with the structure:
    // year, date, interest, principal, ending balance
    // let year, withDate, principal, endingBalance;
    // let year, interestAmountYear, principalAmountYear, endingBalance, mortgagePaymentMontly;
    let  endingBalance, term;
    
    // save it in another variable for making the code easier to read
    endingBalance = loanAmount;


    // let amortizationTableMonthly = [];
    // let amortizationTableYearly = [];
    let amortizationTable = [];
    
    

    // // the start date
    // if (date != null || date != false) {
    //     dateObj = new Date(date);
    // } else {
    //     dateObj = new Date();
    // }
    
    // // this for loop will populate the array of the amortization table
    // for (let i = 0; i<numberOfTerms; i++) {
        
        //     interestAmountYear = 0;
        //     principalAmountYear = 0;
        for (let i = 0; i < numberOfTerms; i++) {
            term = i+1;
            
            // so we will compute the interest and the principal for all the 12 months of a year
            // let currentMonthInterest = endingBalance*splitInterestRate(interestRate, 12);
            let currentMonthInterest = endingBalance*interestRate;
            let currentMonthPrincipal = mortgagePaymentMontly - currentMonthInterest;
    
            // interest += currentMonthInterest;
            // principal += currentMonthPrincipal;

            // substract values to ending balance
            endingBalance -= currentMonthPrincipal;

            // add more precission to the zero
            if (endingBalance < 0.05 && endingBalance>-0.05) {
                endingBalance = 0;
            }
                    
            // // advance date to the next month
            // date.setMonth(date.getMonth()+1);

            // add the values to the list
            amortizationTable.push({
                term: term,
                // date: date.toISOString().split("T")[0],
                interest: currentMonthInterest,
                principal: currentMonthPrincipal,
                endingBalance: endingBalance
            });

        }
        // // add the values to the list
        // this.amortizationTableYearly.push({
        // year: year,
        // date: date.toISOString().split("T")[0],
        // interest: interest,
        // principal: principal,
        // endingBalance: endingBalance
        // });
    // }
    // this.mortgagePayoffDate = date.toISOString().split("T")[0];

    return amortizationTable;
}