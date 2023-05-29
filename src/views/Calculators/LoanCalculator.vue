<script >
    import currencyFormat from '../../components/commonFunctions/dataFilters/currencyFormat.filters';
    
    export default {
        data() {
            return {
                // form model data
                loanAmount: 100000,
                loanTermYears: 10,
                loanTermMonths: 0,
                interestRate: 6,
                paymentFrequency: "monthly",
                compoundEvery: "monthly",

                // results variables


                // state variables
                displayResults: false,
            }
        },
        components: {

        },
        methods: {
            calculateLoan() {

                // display results on page
                this.displayResults = true;
            },
            resetForm() {
                // reset form data
                Object.assign(this.$data, this.$options.data());
                
                // hide the results container
                this.displayResults = false;
            },
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
                    <select v-model="compoundEvery" class="form-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="anually">Anually (APY)</option>
                        <option value="semi-anually">Semi Anually</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="monthly">Monthly (APR)</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Payment Frequency:</span>
                    <select v-model="paymentFrequency" class="form-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="monthly">Monthly</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="weekly">Weekly</option>
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
            Results
        </div>
    </div>
</template>