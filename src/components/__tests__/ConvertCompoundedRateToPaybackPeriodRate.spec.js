import { describe, it, expect } from 'vitest'

import convertCompoundedRateToPaybackPeriodRate from '../commonFunctions/financial/convertCompoundedRateToPaybackPeriodRate.finance';

it('convertCompoundedRateToPaybackPeriodRateSameParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate(0.005, 12, 12);
    expect(result).toBe(0.005);
});

it('convertCompoundedRateToPaybackPeriodRateValidParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate(0.005, 12, 6);
    expect(result).toBe(0.01);
});

it('convertCompoundedRateToPaybackPeriodRateNullParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate(null, null, null);
    expect(result).toBeNaN();
});

it('convertCompoundedRateToPaybackPeriodRateUndefinedParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate(undefined, undefined, undefined);
    expect(result).toBeNaN();
});

it('convertCompoundedRateToPaybackPeriodRateNegativeParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate(-1, -1, -1);
    expect(result).toBeNaN();
});

it('convertCompoundedRateToPaybackPeriodRateZeroParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate(0, 0, 0);
    expect(result).toBe(0);
});

it('convertCompoundedRateToPaybackPeriodRateStringParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate('a', 'b', 'c');
    expect(result).toBeNaN();
});

it('convertCompoundedRateToPaybackPeriodRateStringNumberParameters', () => {
    const result = convertCompoundedRateToPaybackPeriodRate('1', '2', '3');
    expect(result).toBeNaN();
});