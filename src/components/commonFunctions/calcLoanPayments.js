export function calcLoanRecurrentPayment(loanAmount, interestRate,numberOfPayments) {
    let result = loanAmount*(interestRate*Math.pow(1+interestRate,numberOfPayments)/(Math.pow(1+interestRate,numberOfPayments)-1));
    return result;
}