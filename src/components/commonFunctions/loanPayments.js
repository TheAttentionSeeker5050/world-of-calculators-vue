import { end } from "@popperjs/core";

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

export function amortizationTableWithExtraPayment(interestRate, mortgagePaymentMontly, loanAmount, numberOfTerms, extraPaymentAnual, extraPaymentMontly) {
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
        let currentMonthPrincipal = mortgagePaymentMontly - currentMonthInterest + extraPaymentMontly;

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
            currentMonthPrincipal += extraPaymentAnual;
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
}

export function findRemainingDebtInAmortizationTableByTerm(remainingMonths, remainingYears, amortizationTable) {
    // returns the remaining balance based on the amortization table

    // using the remaining months and years, calculate the remaining payments
    let remainingNumberOfPayments = remainingMonths + remainingYears*12;

    // get the current index of the payment in the amortization table (indexes start with 0 on programming, so there is no need to add 1 to the result)
    let currentIndexInAmortizationTable = amortizationTable.length - remainingNumberOfPayments;
    
    // find the remaining balance
    let remainingBalance = amortizationTable[currentIndexInAmortizationTable].endingBalance;
    
    // return value
    return remainingBalance;

}

export function findCurrentPaymentIndexInAmortizationTable(remainingMonths, remainingYears, amortizationTable) {
    // returns the remaining balance based on the amortization table

    // using the remaining months and years, calculate the remaining payments
    let remainingNumberOfPayments = remainingMonths + remainingYears*12;

    // get the current index of the payment in the amortization table (indexes start with 0 on programming, so there is no need to add 1 to the result)
    let currentIndexInAmortizationTable = amortizationTable.length - remainingNumberOfPayments;

    // return value
    return currentIndexInAmortizationTable;
}

