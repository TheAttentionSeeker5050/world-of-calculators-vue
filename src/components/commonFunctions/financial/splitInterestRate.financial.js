export default function splitInterestRate(interestRate, splitByNumber) {
    // this function splits the interest rate into splitByNumber (or n) parts
    // the interest rate arguments is in percent values, but we will transform it into decimal. the return value will be easier to make calculations on
    return interestRate/(splitByNumber*100);
    
}