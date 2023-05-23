<script >

    import {currencyFormat} from "../../components/commonFunctions/filters";
    import {calcLoanRecurrentPayment, splitInterestRate, genericAmortizationTable, findRemainingDebtInAmortizationTableByTerm} from "../../components/commonFunctions/loanPayments";
    import {calcAssetMaintenanceCost, calcOverallAssetCost, calcAssetMaintenanceCostTotal} from "../../components/commonFunctions/commonAssetCosts";
    import  ChartComponent  from "../../components/ChartComponent.vue"
    
    export default {
        data() {
            return {
                // form props
                originalLoanAmount: 400000,
                originalLoanTerm: 30,
                anualInterestRate: 6,
                remainingTermYears: 25,
                remainingTermMonths: 0,
                repaymentOption:"with_extra_payments",

                // return props
                monthlyMortgagePayment: null,
                monthlyInterestRate: null,
                amortizationTable: [],
                remainingLoanBalance: null,



                // list objects props

                // chart props

                // state props
                displayResults: false,
            };
        },
        methods: {
            calculate() {

                // -------------------------- finding the remaining balance

                // calculate interest rate
                this.monthlyInterestRate = splitInterestRate(this.anualInterestRate, 12);

                // calculate monthly payment
                this.monthlyMortgagePayment = calcLoanRecurrentPayment(this.originalLoanAmount, this.monthlyInterestRate, this.originalLoanTerm*12);

                // calculate amortization table
                this.amortizationTable = genericAmortizationTable(this.monthlyInterestRate, this.monthlyMortgagePayment, this.originalLoanAmount, this.originalLoanTerm*12);

                // find the remaining balance using the amortization table
                this.remainingLoanBalance = findRemainingDebtInAmortizationTableByTerm(this.remainingTermMonths, this.remainingTermYears, this.amortizationTable);

                



                this.displayResults = true;
            },
            resetResults() {
                Object.assign(this.$data, this.$options.data());
            },
        },
        mounted() {
            document.title = "World of Calculators - Mortgage Payoff Calculator";
        }
    }
</script>
<template>
    <div id="main-page-wrapper" class="my-5 container-sm">
        <h1 class="text-center my-4">Mortgage Payoff Calculator</h1>
        <h2 class="text-center my-4">If You Know the Remaining Loan Term</h2>

        <form id="calculator-form" class="container-fluid ">
            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text" id="og-loan-amount">Original loan amount:</span>
                    <input type="number" class="form-control" aria-describedby="og-loan-amount" v-model="originalLoanAmount">
                    <span class="input-group-text" >$</span>

                </div>
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text" id="og-loan-term">Original loan term:</span>
                    <input type="number" class="form-control" aria-describedby="og-loan-term" v-model="originalLoanTerm">
                    <span class="input-group-text" >Years</span>

                </div>
            </div>
            
            
            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text" id="remaining-loan-term">Remaining loan term:</span>
                    <input type="number" class="form-control" placeholder="years" aria-describedby="remaining-loan-term" v-model="remainingTermYears">
                    <span class="input-group-text" >Years</span>
                    <input type="number" class="form-control" placeholder="months" aria-describedby="remaining-loan-term__years" v-model="remainingTermMonths">    
                    <span class="input-group-text" >Months</span>

                </div>
                <!-- <div class="input-group mb-3 col-md"></div> -->

            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text" id="anual-interest-rate">InterestRate:</span>
                    <input type="number" class="form-control" placeholder="%" aria-describedby="anual-interest-rate" v-model="anualInterestRate">
                    <span class="input-group-text" >%</span>
                    
                </div>
                <div class="input-group mb-3 col-md"></div>
            </div>

            <h4 class="my-3">Repayment Options</h4>
            
            <div class="row my-2">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__PaybackAltogether" value="payback_altogether" v-model="repaymentOption">
                    <label class="form-check-label" for="repaymentOption__PaybackAltogether">
                        Payback altogether
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__WithExtraPayments" value="with_extra_payments" v-model="repaymentOption">
                    <label class="form-check-label" for="repaymentOption__WithExtraPayments">
                        Repayment with extra payments
                    </label>

                    <div class="input-group mb-3 col-md my-3">
                        <input type="number" class="form-control" placeholder="per month" >
                        <span class="input-group-text" >Per month</span>
                        <input type="number" class="form-control" placeholder="per year" >
                        <span class="input-group-text" >Per year</span>
                        <input type="number" class="form-control" placeholder="one time" >    
                        <span class="input-group-text" >One time</span>
                    </div>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__BiweeklyPayments" value="biweekly_payments" v-model="repaymentOption">
                    <label class="form-check-label" for="repaymentOption__BiweeklyPayments">
                        Biweekly repayment
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__NormalPayment" value="normal_payment" v-model="repaymentOption">
                    <label class="form-check-label" for="repaymentOption__NormalPayment">
                        Normal repayment
                    </label>
                </div>
            </div>
            
            <div class="text-center my-3 mx-auto grid gap-3">
                <button type="button" class="btn btn-secondary me-4" @click="calculate">
                    Calculate
                </button>
                <button type="button"  class="btn btn-danger" @click="resetResults" >Reset</button>
            </div>

        </form>

        <div id="results-container" v-if="displayResults === true" class="container-sm my-5">
            <div id="payoff-container" class="container-sm mb-3">
                <h2>Payoff paid in... years, months</h2>
            </div>

            <div id="interest-savings-summary" class="container-sm mb-3">
                <h2>Summary of money and mortgage terms saved</h2>
            </div>

            <div id="mortgage-cost-payoff-comparison" class="container-sm mb-3">
                <h2>Comparing original vs with payoff cost savings</h2>
            </div>
        </div>

    </div>
</template>