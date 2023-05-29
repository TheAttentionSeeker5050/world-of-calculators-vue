import { expect, it } from 'vitest';
import calcAssetMaintenanceCost from '../commonFunctions/financial/calcAssetMaintenanceCost.financial';

it('calcAssetMaintenanceCostTestValidParametersDollars', () => {
    const result = calcAssetMaintenanceCost(120000,120,"dollars");
    expect(result).toBe(10);
    
});

it('calcAssetMaintenanceCostTestValidParametersPercent', () => {
    const result = calcAssetMaintenanceCost(120000,1,"percent");
    expect(result).toBe(100);
    
});

it('calcAssetMaintenanceCostTestNegativeParameters', () => {
    const result = calcAssetMaintenanceCost(-120000,-120,"dollars");
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceCostTestNullParameters', () => {
    const result = calcAssetMaintenanceCost(null,null,null);
    expect(result).toBe(NaN);
});

it('calcAssetMaintenanceCostTestUndefinedParameters', () => {
    const result = calcAssetMaintenanceCost(undefined,undefined,undefined);
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceCostTestStringParameters', () => {
    const result = calcAssetMaintenanceCost("120000","120","dollars");
    expect(result).toBeNaN();
});

it('calcAssetMaintenanceCostTestZeroParameters', () => {
    const result = calcAssetMaintenanceCost(0,0,"dollars");
    expect(result).toBe(0);
});

it('calcAssetMaintenanceCostTestInvalidCostUnit', () => {
    const result = calcAssetMaintenanceCost(120000,120,"dollar");
    expect(result).toBe(NaN);
});