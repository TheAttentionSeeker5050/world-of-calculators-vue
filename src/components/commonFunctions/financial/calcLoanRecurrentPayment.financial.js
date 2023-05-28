export default function calcLoanRecurrentPayment(loanAmount, interestRate,numberOfPayments) {
    // this function returns a generic loan recurrent payment
    // the interest rate must be as a fraction and be the the rate effective on each payment, like monthly rate, or bi-weekly, but remember that the  term unit must match the number of payments as well
    let result = loanAmount*(interestRate*Math.pow(1+interestRate,numberOfPayments)/(Math.pow(1+interestRate,numberOfPayments)-1));
    return result;
};