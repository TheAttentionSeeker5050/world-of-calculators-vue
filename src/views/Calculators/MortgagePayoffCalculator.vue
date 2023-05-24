<script >

    import {currencyFormat} from "../../components/commonFunctions/filters";
    import {calcLoanRecurrentPayment, splitInterestRate, genericAmortizationTable, findRemainingDebtInAmortizationTableByTerm, findCurrentPaymentIndexInAmortizationTable, amortizationTableWithExtraPayment} from "../../components/commonFunctions/loanPayments";
    import {calcAssetMaintenanceCost, calcOverallAssetCost, calcAssetMaintenanceCostTotal} from "../../components/commonFunctions/commonAssetCosts";
    import {sumReduceArray} from "../../components/commonFunctions/arrayFunctions";
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
                repaymentOption:"with_extra_payments", // with_extra_payments, payback_altogether, biweekly_payments ,normal_payment
                extraRepaymentPerMonth: 500,
                extraRepaymentPerYear: 0,
                extraRepaymentPerOneTime: 0,

                // return props
                monthlyMortgagePayment: null,
                monthlyInterestRate: null,
                amortizationTable: [],
                alternativeAmortizationTable: [],
                remainingLoanBalance: null,
                currentPaymentIndex: null,
                remainingPayments: null,
                interestRateSavings: null,
                totalPaymentsUntilNow: null,
                totalInterestUntilNow: null,
                originalRemainingPayments: null,
                originalRemainingInterestPayments: null,
                originalTotalMortgagePayments: null,
                originalTotalInterestPayments: null,
                alternateRemainingYears: null,
                alternateRemainingMonths: null,
                repaymentSummary: null,


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
                
                // current payment index
                this.currentPaymentIndex = findCurrentPaymentIndexInAmortizationTable(this.remainingTermMonths, this.remainingTermYears, this.amortizationTable)

                // find the remaining balance using the amortization table
                this.remainingLoanBalance = this.amortizationTable[this.currentPaymentIndex-1].endingBalance;

                // get the payment variables
                this.totalPaymentsUntilNow = this.getTotalPaymentsUntilNow();
                this.totalInterestUntilNow = this.getTotalInterestUntilNow();
                this.originalRemainingPayments = this.getOriginalRemainingPayments();
                this.originalRemainingInterestPayments = this.getOriginalRemainingInterest();
                this.originalTotalMortgagePayments = this.getOriginalTotalMortgagePayments();
                this.originalTotalInterestPayments = this.getOriginalTotalInterestPayments();

                // if payoff with extra repayments
                if (this.repaymentOption == "with_extra_payments") {
                    // first substract the one time payment to the remaining loan balance
                    this.remainingLoanBalance = this.remainingLoanBalance >= this.extraRepaymentPerOneTime ? this.remainingLoanBalance - this.extraRepaymentPerOneTime : 0;

                    // calculate the remaining number of months
                    const remainingPayments =  this.remainingTermMonths  + this.remainingTermYears * 12 ;

                    // get new amortization table
                    this.alternativeAmortizationTable = amortizationTableWithExtraPayment(this.monthlyInterestRate, this.monthlyMortgagePayment, this.remainingLoanBalance, remainingPayments, this.extraRepaymentPerYear, this.extraRepaymentPerMonth);
                    
                    let alternateRemainingTerms = this.alternativeAmortizationTable.length;
                    this.alternateRemainingYears = Math.floor(alternateRemainingTerms/12);
                    this.alternateRemainingMonths = alternateRemainingTerms % 12;

                    // add summary paragraph here
                    this.repaymentSummary = "add summary paragraph here";
                    // this.repaymentSummary = "The remaining balance is $372,217.43. By paying extra $500.00 per month and $5,000.00 annually at the year end and $500.00 starting now, the loan will be paid off in 14 years. It is 11 years earlier. This results in savings of $169,356 in interest.";


                    
                }


                this.displayResults = true;
            },
            resetResults() {
                Object.assign(this.$data, this.$options.data());
            },
            onRadioClick() {
                this.displayResults = false;
            },
            formatCurrencyValues(value) {
                return currencyFormat(value);
            },
            getTotalPaymentsUntilNow() {
                // returns the mortgage payments until now
                return this.amortizationTable.filter(row => row.term <= this.currentPaymentIndex).reduce((a, b) => a + b.principal + b.interest, 0);
                
            },
            getTotalInterestUntilNow() {
                // returns the interest payments until now
                return this.amortizationTable.filter(row => row.term <= this.currentPaymentIndex).reduce((a, b) => a + b.interest, 0);
                
            },
            getOriginalRemainingPayments() {
                // returns the original mortgage payments 
                return this.amortizationTable.filter(row => row.term > this.currentPaymentIndex).reduce((a, b) => a + b.principal + b.interest, 0);
                
            },
            getOriginalRemainingInterest() {
                // returns the original interest payments
                return this.amortizationTable.filter(row => row.term > this.currentPaymentIndex).reduce((a, b) => a + b.interest, 0);

            },
            getOriginalTotalMortgagePayments() {
                // returns the original total mortgage payments
                return this.amortizationTable.reduce((a, b) => a + b.principal + b.interest, 0);

            },
            getOriginalTotalInterestPayments() {
                // returns the original total mortgage payments
                return this.amortizationTable.reduce((a, b) => a + b.interest, 0);

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
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__PaybackAltogether" value="payback_altogether" v-model="repaymentOption" @click="onRadioClick">
                    <label class="form-check-label" for="repaymentOption__PaybackAltogether">
                        Payback altogether
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__WithExtraPayments" value="with_extra_payments" v-model="repaymentOption" @click="onRadioClick">
                    <label class="form-check-label" for="repaymentOption__WithExtraPayments">
                        Repayment with extra payments
                    </label>

                    <div class="input-group mb-3 col-md my-3">
                        <input type="number" class="form-control" placeholder="per month" v-model="extraRepaymentPerMonth">
                        <span class="input-group-text" >$ Per month</span>
                        <input type="number" class="form-control" placeholder="per year" v-model="extraRepaymentPerYear">
                        <span class="input-group-text" >$ Per year</span>
                        <input type="number" class="form-control" placeholder="one time" v-model="extraRepaymentPerOneTime">    
                        <span class="input-group-text" >$ One time</span>
                    </div>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__BiweeklyPayments" value="biweekly_payments" v-model="repaymentOption" @click="onRadioClick">
                    <label class="form-check-label" for="repaymentOption__BiweeklyPayments">
                        Biweekly repayment
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__NormalPayment" value="normal_payment" v-model="repaymentOption" @click="onRadioClick">
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
            <div id="payoff-container__payback-altogether" v-if="repaymentOption == 'payback_altogether'" class="container-sm mb-3">
                    
                <!-- <h2>Payoff paid in... years, months</h2>
                 -->
                <div class="row bg-success text-white p-2">
                    <h3>Payoff amount <span v-html="formatCurrencyValues(remainingLoanBalance)"></span> </h3>
                </div>

                <div class="row my-3">
                    <p>The remaining balance is <span v-html="formatCurrencyValues(remainingLoanBalance)"></span>. This is the amount required to repay the entire loan altogether. It will result in savings of <span v-html="formatCurrencyValues(interestRateSavings)"></span></p>
                </div>

                <div class="row my-3">
                    <h4>If payoff altogether</h4>
                    <table class="table table-striped table-hover">
                        
                        <tbody>
                            <tr>
                                <td>Total Payments</td>
                                <td v-html="formatCurrencyValues(remainingLoanBalance + totalPaymentsUntilNow)"></td>
                                <!-- <td >($ Total Payments)</td> -->
                            </tr>

                            <tr>
                                <td>Total Interest</td>
                                <td v-html="formatCurrencyValues(totalInterestUntilNow)"></td>
                            </tr>
                        </tbody>

                    </table>
                </div>

                <div class="row my-3">
                    <h4>The original payoff schedule</h4>
                    <table class="table table-striped table-hover">
                        
                        <tbody>
                            <tr>
                                <td>Monthly Pay</td>
                                <td v-html="formatCurrencyValues(monthlyMortgagePayment)"></td>
                            </tr>

                            <tr>
                                <td>Total Payments</td>
                                <td v-html="formatCurrencyValues(originalTotalMortgagePayments)"></td>
                            </tr>

                            <tr>
                                <td>Total Interest</td>
                                <td v-html="formatCurrencyValues(originalTotalInterestPayments)"></td>
                            </tr>

                            <tr>
                                <td>Remaining Payments</td>
                                <td v-html="formatCurrencyValues(originalRemainingPayments)"></td>
                            </tr>

                            <tr>
                                <td>Remaining Interest</td>
                                <td v-html="formatCurrencyValues(originalRemainingInterestPayments)"></td>
                            </tr>

                        </tbody>
                        
                    </table>
                </div>
                
            </div>

            <div id="payoff-container__with-extra-payments" v-if="repaymentOption == 'with_extra_payments'" class="container-sm mb-3">
                <!-- <h2>repayment with extra payment</h2> -->
                <div class="row bg-success text-white p-2">
                    <h3>Payoff in <span v-html="alternateRemainingYears"></span> years and <span v-html="alternateRemainingMonths"></span> months</h3>
                </div>

                <div class="row my-3">
                    <!-- <p>The remaining balance is <span v-html="formatCurrencyValues(remainingLoanBalance)"></span>.By paying extra <span v-if="extraRepaymentPerMonth>0" v-html="formatCurrencyValues(extraRepaymentPerMonth)+ ' per month'"></span><span v-if="extraRepaymentPerMonth+extraRepaymentPerYear>0">,</span> <span v-html="formatCurrencyValues(extraRepaymentPerYear) + ' annually at the year end'"></span> <span v-html="'and ' + formatCurrencyValues(extraRepaymentPerOneTime) + ' starting now'"></span>, the loan will be paid off in <span v-if="alternateRemainingMonths>0" v-html="alternateRemainingMonths + ' years'"></span> <span v-if="alternateRemainingMonths>0 && alternateRemainingYears>0" v-html="' and '"></span><span v-if="alternateRemainingYears>0" v-html="alternateRemainingYears + ' years'"></span>. It is 11 years earlier. This results in savings of $169,356 in interest.</p> -->
                    <p v-html="repaymentSummary"></p>
                </div>

                <div class="row my-3">
                    <h4>If payoff altogether</h4>
                    <table class="table table-striped table-hover">
                        <thead class="bg-primary text-white">
                        <!-- <thead class="table-dark"> -->
                            <tr>
                            <th scope="col">Interest savings$122,306</th>
                            <th scope="col">Time savings 7 years and 9 months</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>payoff graph, could also be a card</td>
                                <td>payoff graph, could also be a card</td>
                            </tr>

                        </tbody>

                    </table>
                </div>

                <div class="row my-3">
                    <table class="table table-striped table-hover">
                        <thead class="bg-primary text-white">
                        <!-- <thead class="table-dark"> -->
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Original</th>
                            <th scope="col">With payoff</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monthly pay</td>
                                <td>$2,398.20</td>
                                <td>$2,898.20</td>
                            </tr>

                            <tr>
                                <td>Total payments</td>
                                <td>$2,398.20</td>
                                <td>$2,898.20</td>
                            </tr>

                            <tr>
                                <td>Total interest</td>
                                <td>$2,398.20</td>
                                <td>$2,898.20</td>
                            </tr>

                            <tr>
                                <td>Remaining payments</td>
                                <td>$2,398.20</td>
                                <td>$2,898.20</td>
                            </tr>

                            <tr>
                                <td>Remaining interest</td>
                                <td>$2,398.20</td>
                                <td>$2,898.20</td>
                            </tr>

                            <tr>
                                <td>Payoff in</td>
                                <td>$2,398.20</td>
                                <td>$2,898.20</td>
                            </tr>

                        </tbody>

                    </table>
                </div>


            </div>

            <div id="interest-savings-summary" class="container-sm mb-3">
                <!-- <h2>Summary of money and mortgage terms saved</h2> -->
            </div>

            <div id="mortgage-cost-payoff-comparison" class="container-sm mb-3">
                <!-- <h2>Comparing original vs with payoff cost savings</h2> -->
            </div>
        </div>

    </div>
</template>