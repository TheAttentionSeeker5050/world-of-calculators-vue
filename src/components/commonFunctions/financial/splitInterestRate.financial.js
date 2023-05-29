export default function splitInterestRate(interestRate, splitByNumber) {
    // this function splits the interest rate into splitByNumber (or n) parts
    // the interest rate arguments is in percent values, but we will transform it into decimal. the return value will be easier to make calculations on

    // first add some validations
    if (interestRate === null ) {
        return 0;
    }

    if (splitByNumber === null) {
        return NaN;
    }
    if (interestRate === undefined || splitByNumber === undefined) {
        return NaN;
    }
    if (interestRate < 0 || splitByNumber < 0) {
        return NaN;
    }

    if (splitByNumber === 0) {
        return NaN;
    }
    
    
    
    return Number(interestRate)/(Number(splitByNumber)*100);

    
    
}