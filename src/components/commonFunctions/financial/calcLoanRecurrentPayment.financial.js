export default function calcLoanRecurrentPayment(loanAmount, interestRate,numberOfPayments) {
    // this function returns a generic loan recurrent payment
    // the interest rate must be as a fraction and be the the rate effective on each payment, like monthly rate, or bi-weekly, but remember that the  term unit must match the number of payments as well
    
    // first add some validation of parameters
    if (loanAmount <= 0 || interestRate < 0 || numberOfPayments <= 0) {
        return NaN;
    }

    if (interestRate === null || interestRate === undefined || numberOfPayments === null || numberOfPayments === undefined || loanAmount === null || loanAmount === undefined) {
        return NaN;
    }

    if (typeof interestRate !== 'number' || typeof numberOfPayments !== 'number' || typeof loanAmount !== 'number') {
        return NaN;
    }

    if (interestRate === 0) {
        return loanAmount/numberOfPayments;
    }

    let result = loanAmount*(interestRate*Math.pow(1+interestRate,numberOfPayments)/(Math.pow(1+interestRate,numberOfPayments)-1));
    return result;
};