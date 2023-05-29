import { expect, it } from 'vitest';
import calcLoanRecurrentPayment from '../commonFunctions/financial/calcLoanRecurrentPayment.financial';

it('calcLoanRecurrentPaymentTestValidParameters', () => {
    const result = calcLoanRecurrentPayment(320000,0.005,12*30);
    expect(result).toBeCloseTo(1918.56,1);
    
});

it('calcLoanRecurrentPaymentTestNegativeParameters', () => {
    const result = calcLoanRecurrentPayment(-320000,0.005,-12*30);
    expect(result).toBeNaN();
});

it('calcLoanRecurrentPaymentTestNullParameters', () => {
    const result = calcLoanRecurrentPayment(null,0.005,null);
    expect(result).toBeNaN();
});

it('calcLoanRecurrentPaymentTestUndefinedParameters', () => {
    const result = calcLoanRecurrentPayment(undefined,0.005,undefined);
    expect(result).toBeNaN();
});

it('calcLoanRecurrentPaymentTestStringParameters', () => {
    const result = calcLoanRecurrentPayment("320000","0.005","12*30");
    expect(result).toBeNaN();
});

it('calcLoanRecurrentPaymentTestZeroParameters', () => {
    const result = calcLoanRecurrentPayment(0,0,0);
    expect(result).toBeNaN();
});

it('calcLoanRecurrentPaymentTestZeroInterestRate', () => {
    const result = calcLoanRecurrentPayment(100000,0,100);
    expect(result).toBe(1000);
});

