import { expect, it } from 'vitest';
import splitInterestRate from '../commonFunctions/financial/splitInterestRate.financial';

it('splitInterestRateTestSplit6Yearly', () => {
    const result = splitInterestRate(6, 12);
    expect(result).toBe(0.005);
});

it('splitInterestRateTestSplitNegativeRate', () => {
    const result = splitInterestRate(-6, 12);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestSplitNegativeSplitBy', () => {
    const result = splitInterestRate(6, -12);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestSplitNullRate', () => {
    const result = splitInterestRate(null, 12);
    expect(result).toBe(0);
});

it('splitInterestRateTestSplitNullSplitBy', () => {
    const result = splitInterestRate(6, null);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestSplitUndefinedRate', () => {
    const result = splitInterestRate(undefined, 12);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestSplitUndefinedSplitBy', () => {
    const result = splitInterestRate(6, undefined);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestSplitZeroRate', () => {
    const result = splitInterestRate(0, 12);
    expect(result).toBe(0);
});

it('splitInterestRateTestSplitZeroSplitBy', () => {
    const result = splitInterestRate(6, 0);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestStringInterestRate', () => {
    const result = splitInterestRate("6", 12);
    expect(result).toBe(0.005);
});

it('splitInterestRateTestStringSplitBy', () => {
    const result = splitInterestRate(6, "12");
    expect(result).toBe(0.005);
});

it('splitInterestRateTestObjectInterestRate', () => {
    const result = splitInterestRate(new Object(), 12);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestObjectSplitBy', () => {
    const result = splitInterestRate(6, new Object());
    expect(result).toBe(NaN);
});

it('splitInterestRateTestNoParameters', () => {
    const result = splitInterestRate();
    expect(result).toBe(NaN);
});

it('splitInterestRateTestInvalidStringInterest', () => {
    const result = splitInterestRate("abc", 12);
    expect(result).toBe(NaN);
});

it('splitInterestRateTestInvalidStringSplitBy', () => {
    const result = splitInterestRate(6, "abc");
    expect(result).toBe(NaN);
});