import { describe, it, expect } from 'vitest'

import convertAPYToCompoundedRate from '../commonFunctions/financial/convertAPYToCompoundedRate.finance';

it('convertAPYToCompoundedRateValidParameters', () => {
    const result = convertAPYToCompoundedRate(2.4, 12);
    expect(result).toBeCloseTo(0.001978,6);
});

it('convertAPYToCompoundedRateNullParameters', () => {
    const result = convertAPYToCompoundedRate(null, null);
    expect(result).toBeNaN();
});

it('convertAPYToCompoundedRateUndefinedParameters', () => {
    const result = convertAPYToCompoundedRate(undefined, undefined);
    expect(result).toBeNaN();
});

it('convertAPYToCompoundedRateNegativeParameters', () => {
    const result = convertAPYToCompoundedRate(-2.4, -12);
    expect(result).toBeNaN();
});

it('convertAPYToCompoundedRateZeroParameters', () => {
    const result = convertAPYToCompoundedRate(0, 0);
    expect(result).toBe(0);
});

it('convertAPYToCompoundedRateStringParameters', () => {
    const result = convertAPYToCompoundedRate("2.4", "12");
    expect(result).toBeNaN();
});