<script >
    import currencyFormat from '../../components/commonFunctions/dataFilters/currencyFormat.filters';
    import convertAPYToCompoundedRate from '../../components/commonFunctions/financial/convertAPYToCompoundedRate.finance';
    import convertCompoundedRateToPaybackPeriodRate from '../../components/commonFunctions/financial/convertCompoundedRateToPaybackPeriodRate.finance';
    import calculateRecurrentLoanPayment from "../../components/commonFunctions/financial/calcLoanRecurrentPayment.financial";

    export default {
        data() {
            return {
                // form model data
                loanAmount: 100000,
                loanTermYears: 10,
                loanTermMonths: 0,
                interestRate: 6,
                paymentFrequency: "12",
                compoundEvery: "1",

                // results variables
                recurrentLoanPayment: null,
                totalOfAllPayments: null,
                totalInterestPaid: null,
                // totalPrincipalPaid: null,
                totalNumberOfPayments: null,
                totalNumberOfLoanTerms: null,
                amortizationTable: [],

                // state variables
                displayResults: false,
            }
        },
        components: {

        },
        methods: {
            calculateLoan() {
                // calculate total number of payments
                this.totalNumberOfLoanTerms = (this.loanTermYears * 12 +  this.loanTermMonths ) * (this.paymentFrequency / 12);


                // calculate the compound interest rate and the payback period interest rate
                let compoundInterestRate = convertAPYToCompoundedRate(this.interestRate, Number(this.compoundEvery));
                let paybackPeriodInterestRate = convertCompoundedRateToPaybackPeriodRate(Number(compoundInterestRate), Number(this.compoundEvery), Number(this.paymentFrequency));
                
                // calculate the recurrent loan payment
                this.recurrentLoanPayment = calculateRecurrentLoanPayment(this.loanAmount, paybackPeriodInterestRate, this.totalNumberOfLoanTerms);

                // calculate the total number of payments
                this.totalOfAllPayments = this.totalNumberOfLoanTerms * this.recurrentLoanPayment;
                this.totalInterestPaid = this.totalOfAllPayments - this.loanAmount;



                // display results on page
                this.displayResults = true;
            },
            resetForm() {
                // reset form data
                Object.assign(this.$data, this.$options.data());

                // hide the results container
                this.displayResults = false;
            },
            formatCurrencyValues(value) {
                return currencyFormat(value);
            }
        },
        mounted() {

        }
    }
</script>

<template>
    <div id="main-page-wrapper" class="my-5 container-sm">
        <h1>General Loan Calculator</h1>
        
        <form id="calculator-form" class="container-fluid ">
            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Loan Amount:</span>
                    <input v-model="loanAmount" type="number" class="form-control" placeholder="Loan Amount" aria-label="Loan Amount">
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Loan Term:</span>
                    <input v-model="loanTermYears" type="number" class="form-control" placeholder="Years" aria-label="Years">
                    <span class="input-group-text">Years</span>
                    <input v-model="loanTermMonths" type="number" class="form-control" placeholder="Months" aria-label="Months">
                    <span class="input-group-text">Months</span>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Interest Rate:</span>
                    <input v-model="interestRate" type="number" class="form-control" placeholder="Interest Rate" aria-label="Interest Rate">
                    <span class="input-group-text">%</span>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Compound Every:</span>
                    <select v-model="compoundEvery" class="form-select " id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="12">Anually (APY)</option>
                        <!-- <option value="2">Semi Anually</option>
                        <option value="4">Quarterly</option> -->
                        <option value="1">Monthly (APR)</option>
                        <!-- <option value="24">Bi-Weekly</option>
                        <option value="52">Weekly</option> -->
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Payment Frequency:</span>
                    <select v-model="paymentFrequency" class="form-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="12">Monthly</option>
                        <option value="24">Bi-Weekly</option>
                        <option value="52">Weekly</option>
                    </select>
                </div>
            </div>

            <div class="text-center my-3 mx-auto grid gap-3">
                <button type="button" id="calculate-button" class="btn btn-secondary me-4" @click="calculateLoan">
                    Calculate
                </button>

                <button type="button" id="reset-button" class="btn btn-danger " @click="resetForm">Reset</button>
            </div>

        </form>

        <div v-if="displayResults" class="container-fluid" id="results-container">
            <div class="row bg-success text-white p-2">
                <h3>Results</h3>
            </div>

            <table class="table ">
                <tbody>
                    <tr>
                        <td>Recurrent Payment</td>
                        <td v-html="formatCurrencyValues(recurrentLoanPayment)"></td>
                        
                    </tr>
                    <tr>
                        <td>Total of <span v-html="totalNumberOfLoanTerms"></span> payments</td>
                        <td v-html="formatCurrencyValues(totalOfAllPayments)"></td>
                        
                    </tr>
                    <tr>
                        <td>Total Interest</td>
                        <td v-html="formatCurrencyValues(totalInterestPaid)"></td>
                        
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>