export default function convertCompoundedRateToPaybackPeriodRate(compoundedRate, compoundingsPerYear, numberOfPaymentsPerYear) {
    // convert compounded rate to payback period rate

    // first add some validation of parameters
    if (compoundedRate === null || compoundingsPerYear === null || numberOfPaymentsPerYear === null) {
        return NaN;
    };

    if (compoundedRate === undefined || compoundingsPerYear === undefined || numberOfPaymentsPerYear === undefined) {
        return NaN;
    };

    if (compoundedRate < 0 || compoundingsPerYear < 0 || numberOfPaymentsPerYear < 0) {
        return NaN;
    };

    if (compoundedRate === 0 || compoundingsPerYear === 0 || numberOfPaymentsPerYear === 0) {
        return 0;
    };

    if (typeof compoundedRate != 'number' || typeof compoundingsPerYear != 'number' || typeof numberOfPaymentsPerYear != 'number') {
        return NaN;
    };

    // divide compoundedRate by compoundingsPerYear and sum 1
    let paybackPeriodRate = compoundedRate*compoundingsPerYear/numberOfPaymentsPerYear;

    return paybackPeriodRate;

};