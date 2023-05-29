import { expect, it } from 'vitest';
import calcAssetMaintenanceTotalCost from '../commonFunctions/financial/calcAssetMaintenanceTotalCost.financial';

it('calcAssetMaintenanceTotalCostTestValidParameters', () => {
    const result = calcAssetMaintenanceTotalCost(100,12);
    expect(result).toBe(1200);
    
});

it('calcAssetMaintenanceTotalCostTestNegativeParameters', () => {
    const result = calcAssetMaintenanceTotalCost(-100,-12);
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceTotalCostTestNullParameters', () => {
    const result = calcAssetMaintenanceTotalCost(null,null);
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceTotalCostTestUndefinedParameters', () => {
    const result = calcAssetMaintenanceTotalCost(undefined,undefined);
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceTotalCostTestStringParameters', () => {
    const result = calcAssetMaintenanceTotalCost("100","12");
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceTotalCostTestZeroNumberOfMonths', () => {
    const result = calcAssetMaintenanceTotalCost(1000,0);
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceTotalCostTestZeroMonthlyCost', () => {
    const result = calcAssetMaintenanceTotalCost(0,12);
    expect(result).toBe(0);
});