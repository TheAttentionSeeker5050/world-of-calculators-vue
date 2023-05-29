import { expect, it } from 'vitest';
import calcOverallAssetCost from '../commonFunctions/financial/calcOverallAssetCost.financial';

it('calcOverallAssetCostTestValidParameters', () => {
    const result = calcOverallAssetCost(100,12,3,85);
    expect(result).toBe(200);
    
});

it('calcOverallAssetCostTestNegativeParameters', () => {
    const result = calcOverallAssetCost(-100,-12,-3,-85);
    expect(result).toBeNaN();
});

it('calcOverallAssetCostTestNullParameters', () => {
    const result = calcOverallAssetCost(null,null,null,null);
    expect(result).toBeNaN();
});

it('calcOverallAssetCostTestUndefinedParameters', () => {
    const result = calcOverallAssetCost(undefined,undefined,undefined,undefined);
    expect(result).toBeNaN();
});

it('calcOverallAssetCostTestStringParameters', () => {
    const result = calcOverallAssetCost("100","12","3","85");
    expect(result).toBeNaN();
});

it('calcOverallAssetCostTestZeroNumberOfMonths', () => {
    const result = calcOverallAssetCost(1000,0,0,0);
    expect(result).toBe(1000);
});

it('calcOverallAssetCostTestNoParams', () => {
    const result = calcOverallAssetCost();
    expect(result).toBeNaN();
});