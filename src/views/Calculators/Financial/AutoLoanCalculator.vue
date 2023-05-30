<script >
    import currencyFormat from '../../../components/commonFunctions/dataFilters/currencyFormat.filters';
    
    import calculateRecurrentLoanPayment from "../../../components/commonFunctions/financial/calcLoanRecurrentPayment.financial";
    import splitInterestRate from '../../../components/commonFunctions/financial/splitInterestRate.financial';
    import ChartComponent from '../../../components/ChartComponent.vue';

    import generateChartData from "../../../components/commonFunctions/general/generateChartData.general"

    export default {
        data() {
            return {
                // form model data
                loanAmount: 40000,
                loanTermMonths: 60,
                interestRate: 5,
                cashIncentives: 0,
                downPayment: 5000,
                tradeInValue: 0,
                amountOwedOnTradeIn: 0,
                salesTaxPercent: 7,
                otherFees: 2000,


                // results variables
                recurrentPayment: null,
                totalLoanAmount: null,
                salesTax: null,
                upFrontPayment: null,
                totalOfAllPayments: null,
                totalInterestPaid: null,
                totalLoanCosts: null,
                totalLoanCostAfterExtraFees: null,

                // chart variables
                chartTitle: 'Cost Breakdown',
                chartConfigObject: null,
                chartOptions: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            display: true,
                        },
                        title: {
                            display: true,
                            text: 'Cost Breakdown',
                            font: {
                                size: 20
                            }
                        }
                    }
                },

                // state variables
                displayResults: false,
            }
        },
        components: {
            ChartComponent,
        },
        methods: {
            calculateLoan() {
                
                // calculate the interest rate per month in decimal form
                let interestRateMonthly = splitInterestRate(this.interestRate, 12);

                // calculate the total loan amount
                this.totalLoanAmount = this.loanAmount  - this.downPayment - this.tradeInValue - this.cashIncentives + this.amountOwedOnTradeIn; 

                // calculate monthly payment
                this.recurrentPayment = calculateRecurrentLoanPayment(this.totalLoanAmount, interestRateMonthly, this.loanTermMonths);

                // calculate sales tax
                this.salesTax = (this.totalLoanAmount + this.downPayment) * (this.salesTaxPercent / 100);

                // calculate up front payment
                this.upFrontPayment = this.downPayment + this.salesTax + this.otherFees;

                // calculate total of all payments
                this.totalOfAllPayments = this.recurrentPayment * this.loanTermMonths;

                // calculate total interest paid
                this.totalInterestPaid = this.totalOfAllPayments - this.totalLoanAmount;

                // calculate total loan costs
                this.totalLoanCosts = this.totalLoanAmount + this.totalInterestPaid;

                // run the populate chart function
                this.populateDonutChart();

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
            },
            populateDonutChart() {
                let title = 'Cost Breakdown';
                let labels = ['Principal', 'Interest'];
                let chartData = [this.totalLoanAmount, this.totalInterestPaid];
                let chartType = 'doughnut';
                this.chartConfigObject = generateChartData(title, labels, chartData, chartType);
            },
        },
        mounted() {

        }
    }
</script>

<template>
    <div id="main-page-wrapper" class="my-5 container-sm">
        <h1>Auto Loan Calculator</h1>
        
        <form id="calculator-form" class="container-fluid ">
            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Loan Amount:</span>
                    <input v-model="loanAmount" type="number" class="form-control" placeholder="Loan Amount" aria-label="Loan Amount">
                    <span class="input-group-text">$</span>
                    
                </div>
            </div>
            
            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Loan Term:</span>
                    <input v-model="loanTermMonths" type="number" class="form-control" placeholder="Months" aria-label="Months">
                    <span class="input-group-text">Months</span>
                </div>

                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Interest Rate:</span>
                    <input v-model="interestRate" type="number" class="form-control" placeholder="Interest Rate" aria-label="Interest Rate">
                    <span class="input-group-text">%</span>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Cash Incentives:</span>
                    <input v-model="cashIncentives" type="number" class="form-control" placeholder="Cash Incentives" aria-label="Cash Incentives">
                    <span class="input-group-text">$</span>

                </div>

                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Down Payment:</span>
                    <input v-model="downPayment" type="number" class="form-control" placeholder="Down Payment" aria-label="Down Payment">
                    <span class="input-group-text">$</span>
                </div>
            </div>

            

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Trade-In Value:</span>
                    <input v-model="tradeInValue" type="number" class="form-control" placeholder="Trade-In Value" aria-label="Trade-In Value">
                    <span class="input-group-text">$</span>
                </div>

                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Debt On Trade-In:</span>
                    <input v-model="amountOwedOnTradeIn" type="number" class="form-control" placeholder="Trade-In Owed" aria-label="Trade-In Owed">
                    <span class="input-group-text">$</span>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Sales Tax:</span>
                    <input v-model="salesTaxPercent" type="number" class="form-control" placeholder="Sales Tax" aria-label="Sales Tax">
                    <span class="input-group-text">%</span>
                </div>

                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Other Fees:</span>
                    <input v-model="otherFees" type="number" class="form-control" placeholder="Other Fees" aria-label="Other Fees">
                    <span class="input-group-text">$</span>
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
                <h3>Monthly Pay: <span v-html="formatCurrencyValues(recurrentPayment)"></span></h3>
            </div>

            

            <table class="table ">
                <tbody>
                    <tr>
                        <td>Total Loan Amount</td>
                        <td v-html="formatCurrencyValues(totalLoanAmount)"></td>
                    </tr>

                    <tr>
                        <td>Sales Tax</td>
                        <td v-html="formatCurrencyValues(salesTax)"></td>
                    </tr>

                    <tr>
                        <td>Upfront Payment</td>
                        <td v-html="formatCurrencyValues(upFrontPayment)"></td>
                    </tr>

                    <tr>
                        <td>Total of <span v-html="loanTermMonths"></span> Loan Payments</td>
                        <td v-html="formatCurrencyValues(totalOfAllPayments)"></td>
                    </tr>

                    <tr>
                        <td>Total Loan Interest</td>
                        <td v-html="formatCurrencyValues(totalInterestPaid)"></td>
                    </tr>

                    <tr>
                        <td>Total Cost</td>
                        <td v-html="formatCurrencyValues(totalLoanCosts)"></td>
                    </tr>
                </tbody>
            </table>

            <div id="graph-section">
                <div id="graph-container">
                    <ChartComponent v-if="displayResults" :options="chartOptions" :chartData="chartConfigObject" :chartTitle="chartTitle"/>
                </div>
            </div>
        </div>
    </div>
</template>