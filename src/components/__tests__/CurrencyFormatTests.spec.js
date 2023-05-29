import { expect, it } from 'vitest'
import currencyFormat from '../commonFunctions/dataFilters/currencyFormat.filters'


it('CurrencyFormatChangeFloatToCurrencyString', () => {
    const result = currencyFormat(123456789.123456789)
    expect(result).toBe("$123,456,789.12")
})

it('CurrencyFormatChangeIntToCurrencyString', () => {
    const result = currencyFormat(123456789)
    expect(result).toBe("$123,456,789.00")
})

it('CurrencyFormatChangeStringToCurrencyString', () => {
    const result = currencyFormat("123456789")
    expect(result).toBe("$123,456,789.00")
})

it('CurrencyFormatChangeNullToCurrencyString', () => {
    const result = currencyFormat(null)
    expect(result).toBe("$0.00")
})

it('CurrencyFormatChangeUndefinedToCurrencyString', () => {
    const result = currencyFormat(undefined)
    expect(result).toBe(NaN)
})

it('CurrencyFormatChangeObjectToCurrencyStringReturnNaN', () => {
    const result = currencyFormat(new Object())
    expect(result).toBe(NaN)
})

it('CurrencyFormatNoParameterReturnError', () => {
    const result = currencyFormat()
    expect(result).toBe(NaN)
})

it('CurrencyFormatChangeNegativeNumberToNegativeCurrency', () => {
    const result = currencyFormat(-123456789)
    expect(result).toBe("-$123,456,789.00")
})