<script >
    // import {currencyFormat} from "../../components/commonFunctions/filters";
    // import {calcLoanRecurrentPayment, splitInterestRate} from "../../components/commonFunctions/loanPayments";
    // import {calcAssetMaintenanceCost, calcOverallAssetCost, calcAssetMaintenanceCostTotal} from "../../components/commonFunctions/commonAssetCosts";

    import currencyFormat from "../../../components/commonFunctions/dataFilters/currencyFormat.filters"
    import calcLoanRecurrentPayment from "../../../components/commonFunctions/financial/calcLoanRecurrentPayment.financial"
    import splitInterestRate from "../../../components/commonFunctions/financial/splitInterestRate.financial"
    import calcAssetMaintenanceCost from "../../../components/commonFunctions/financial/calcAssetMaintenanceCost.financial"
    import calcOverallAssetCost from "../../../components/commonFunctions/financial/calcOverallAssetCost.financial"
    import calcAssetMaintenanceCostTotal from "../../../components/commonFunctions/financial/calcAssetMaintenanceTotalCost.financial"
    
    
    import  ChartComponent  from "../../../components/ChartComponent.vue"
    export default {
        data() {
            return {
                // values to display
                mortgageAmount: null,
                downPaymentDollars: null,
                mortgagePaymentMontly:null,
                mortgagePaymentTotal:null,
                propertyTaxesMontly:null,
                propertyTaxesTotal:null,
                homeInsuranceMontly:null,
                homeInsuranceTotal:null,
                otherCostsMontly:null,
                otherCostsTotal:null,
                totalOutOfPocketMontly:null,
                totalOutOfPocketTotal:null,
                amortizationTableYearly: [],
                amortizationTableMonthly: [],
                mortgagePayoffDate: null,
                totalInterest: null,

                // charts and graphs
                costSplitChartTitle: null,
                costSplitChartData: {},
                costSplitChartOptions: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                },               
                // form input props
                homePrice: 400000,
                downPayment: 30,
                downPaymentUnits: "percent",
                loanTermYears: 30,
                interestRate: 6,
                startDate: new Date().toISOString().split("T")[0],
                includeTaxesCostCheck: this.includeTaxesCostCheck,
                propertyTaxes: 1.2,
                propertyTaxesUnits: "percent", // percent or dollars
                homeInsurance: 1500,
                homeInsuranceUnits: "dollars",
                pmiInsurance: 0,
                pmiInsuranceUnits: "dollars",
                hoaFee: 0,
                hoaFeeUnits: "dollars",
                otherCosts: 4000,
                otherCostsUnits: "dollars",
                amortizationSpan: "yearly",

                // state props
                displayResults: false,
            };
        },
        components: {
            ChartComponent,
        },
        methods: {
            calculateMortgage() {
                const price = Number(this.homePrice);

                // reset the amortization array
                this.amortizationTableYearly = [];

                // calculate the down payment in dollars
                this.downPaymentDollars =
                this.downPaymentUnits === "percent"
                ? (Number(this.downPayment) / 100) * price
                : Number(this.downPayment); // the this.downpayment is the input property, not the variable we will work from. It can be in either money or percent. The new variable we are calling is all in dollars
                
                // get mortgage amount, from this we will calculate mortgage cost
                this.mortgageAmount = price - this.downPaymentDollars;
                
                // split rate into 12 months
                // const interestRateMonthly =  this.interestRate/(12*100);
                const interestRateMonthly = splitInterestRate(this.interestRate, 12);
                // calculate monthly payment
                const numberOfPayments = this.loanTermYears*12;
                
                
                try {
                    // enclose into a try catch
                    // calculate monthly using all of the variables necessary
                    this.mortgagePaymentMontly = this.calcMonthlyPayment(this.mortgageAmount, interestRateMonthly, numberOfPayments);
                    
                    // I will use the same function as in the additional cost because it does the same and returns the same result 
                    this.mortgagePaymentTotal = this.calcAdditionalCostTotal(this.mortgagePaymentMontly, numberOfPayments);
                    // the other costs
                    // property taxes
                    this.propertyTaxesMontly = this.calcAdditionalCostMontly(this.propertyTaxes, this.propertyTaxesUnits);
                    this.propertyTaxesTotal = this.calcAdditionalCostTotal(this.propertyTaxesMontly, numberOfPayments);

                    // home insurance tax
                    this.homeInsuranceMontly = this.calcAdditionalCostMontly(this.homeInsurance, this.homeInsuranceUnits);
                    this.homeInsuranceTotal = this.calcAdditionalCostTotal(this.homeInsuranceMontly, numberOfPayments);

                    // other cost
                    this.otherCostsMontly = this.calcAdditionalCostMontly(this.otherCosts, this.otherCostsUnits);
                    this.otherCostsTotal = this.calcAdditionalCostTotal(this.otherCostsMontly, numberOfPayments);

                    this.calcTotalOutOfPocket(numberOfPayments);

                    // display amortization schedulle table
                    this.calcAmortizationTable()

                    // display split mortgage cost section
                    this.totalInterest = this.calcTotalInterest();

                    // generate charts
                    this.generatePieChart()
                } catch (e) {
                    
                    console.error(e.message);
                }

                // when all this is done, display results
                this.displayResults = true;

            },
            resetForm() {
                Object.assign(this.$data, this.$options.data());
            },
            
            calcMonthlyPayment(loanAmount, interestRate,numberOfPayments) {
                return calcLoanRecurrentPayment(loanAmount, interestRate,numberOfPayments);
            },
            calcAdditionalCostMontly(cost, costUnit) {
                return calcAssetMaintenanceCost(this.homePrice, cost, costUnit);

            },
            calcAdditionalCostTotal(monthlyCost, numberOfPayments) {
                return calcAssetMaintenanceCostTotal(monthlyCost, numberOfPayments)
            },
            calcTotalOutOfPocket(numberOfPayments) {
                
                this.totalOutOfPocketMontly = calcOverallAssetCost(this.mortgagePaymentMontly, this.propertyTaxesMontly, this.homeInsuranceMontly, this.otherCostsMontly);
                this.totalOutOfPocketTotal = calcAssetMaintenanceCostTotal(this.totalOutOfPocketMontly, numberOfPayments);
            },
            calcAmortizationTable() {
                // the list will contain dictionaries with the structure:
                //     year, date, interest, principal, ending balance
                let year, date, interest, principal, endingBalance;
                endingBalance = this.mortgageAmount;
                this.amortizationTableMonthly = [];
                this.amortizationTableYearly = [];
                
                // the start date
                date = new Date(this.startDate);
                

                // this for loop will populate the array of the amortization table
                for (let i = 0; i<this.loanTermYears; i++) {
                    year = i+1;
                    
                    
                    
                    interest = 0;
                    principal = 0;
                    for (let j = 0; j < 12; j++) {
                    // so we will compute the interest and the principal for all the 12 months of a year
                    // let currentMonthInterest = endingBalance*(this.interestRate/(12*100));
                    let currentMonthInterest = endingBalance*splitInterestRate(this.interestRate, 12);
                    let currentMonthPrincipal = this.mortgagePaymentMontly - currentMonthInterest;
                    
                    
                    
                    interest += currentMonthInterest;
                    principal += currentMonthPrincipal;

                    // substract values to ending balance
                    endingBalance -= currentMonthPrincipal;

                    // add more precission to the zero
                    if (endingBalance < 0.05 && endingBalance>-0.05) {
                        endingBalance = 0;
                    }
                    
                    // advance date to the next month
                    date.setMonth(date.getMonth()+1);

                    // add the values to the list
                    this.amortizationTableMonthly.push({
                        year: year,
                        date: date.toISOString().split("T")[0],
                        interest: currentMonthInterest,
                        principal: currentMonthPrincipal,
                        endingBalance: endingBalance
                    });

                    }
                    // add the values to the list
                    this.amortizationTableYearly.push({
                    year: year,
                    date: date.toISOString().split("T")[0],
                    interest: interest,
                    principal: principal,
                    endingBalance: endingBalance
                    });
                }
                this.mortgagePayoffDate = date.toISOString().split("T")[0];
            },
            calcTotalInterest() {
            return this.amortizationTableYearly.reduce((total, item) => total + item.interest, 0);
            },
            formatCurrency(value) {
                return currencyFormat(value);
            },
            generatePieChart(){
                this.costSplitChartTitle = 'Overall Costs Breakdown';
                const data = {
                    labels: [
                        'Principal',
                        'Interest',
                        'Property Tax',
                        'Home Insurance',
                        'Other Costs'
                    ],
                    datasets: [{
                        label: this.costSplitChartTitle,
                        data: [
                            this.mortgagePaymentTotal-this.totalInterest,
                            this.totalInterest,
                            this.propertyTaxesTotal,
                            this.homeInsuranceTotal,
                            this.otherCostsTotal
                        ],
                        backgroundColor: [
                        'rgb(255, 190, 11)',
                        'rgb(251, 86, 7)',
                        'rgb(255, 0, 110)',
                        'rgb(131, 56, 236)',
                        'rgb(58, 134, 255)'
                        ],
                        hoverOffset: 4
                    }]
                };
                this.costSplitChartData = {
                    type: "doughnut",
                    data: data,
                };
            },
        },
        mounted() {
            // console.log("Vue 3 mounted");
            document.title = "World of Calculators - Mortgage Calculator";
        },
        
    };

</script>

<template>
    <div id="main-page-wrapper" class="my-5 container-sm">
    <h1 class="text-center my-4">Mortgage Calculator</h1>

    <form id="calculator-form" class="container-fluid ">
        <div class="row">

            <div class="input-group mb-3 col-md">
                <span class="input-group-text" id="home-price">Home Price</span>
                <input 
                    type="number" class="form-control" aria-describedby="home-price" id="input-home-price"
                    v-model="homePrice"
                    
                >
            </div>

            <div class="input-group mb-3 col-md">
                <span class="input-group-text" id="down-payment">Down Payment</span>
                <input type="number" class="form-control w-25" aria-describedby="down-payment" id="input-down-payment"
                v-model="downPayment"
                >

                <select class="form-select " id="down-payment-units" 
                v-model="downPaymentUnits">
                    <option value="percent" selected>%</option>
                    <option value="dollars">$</option>
                </select>

            </div>
        </div>

        <div class="row">
            <div class="input-group mb-3 col-md">
                <span class="input-group-text" id="loan-term-years">Loan Term</span>
                <input type="number" class="form-control" aria-describedby="loan-term-years" id="input-loan-term-years"
                v-model="loanTermYears">
                <span class="input-group-text">Years</span>
            </div>

            <div class="input-group mb-3 col-md">
                <span class="input-group-text" id="interest-rate">Interest Rate</span>
                <input type="number" class="form-control" aria-describedby="interest-rate" id="input-interest-rate"
                v-model="interestRate">
                <span class="input-group-text">%</span>
            </div>
        </div>

        <div class="row">
            <div class="input-group mb-3 col-md">
                <span class="input-group-text" id="start-date">Start Date</span>
                <input type="date" class="form-control" aria-describedby="start-date" id="input-start-date"
                v-model="startDate">
            </div>

            <div class="input-group mb-3 col-md"></div>
        </div>
        
        <div class="input-group mb-3 col-md my-4">
            <input type="checkbox" name="include-taxes-costs" id="include-taxes-cost-check"
            v-model="includeTaxesCostCheck" checked>
            <span class="mx-2">Include taxes & costs</span>
        </div>

        <div id="taxes-costs-container">
            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text" id="property-taxes">Property Taxes</span>
                    <input type="number" class="form-control w-25" aria-describedby="property-taxes" id="input-property-taxes"
                    v-model="propertyTaxes">

                    <select class="form-select " id="property-taxes-units"
                    v-model="propertyTaxesUnits">
                        <option value="percent" selected>%</option>
                        <option value="dollars">$</option>
                    </select>
                </div>

                <div class="input-group mb-3 col-md">
                    <span class="input-group-text" id="home-insurance">Home Insurance</span>
                    <input type="number" class="form-control w-25" aria-describedby="home-insurance" id="input-home-insurance"
                    v-model="homeInsurance">

                    <select class="form-select " id="home-insurance-units"
                    v-model="homeInsuranceUnits">
                        <option value="percent" >%</option>
                        <option value="dollars" selected>$</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text" id="other-costs">Other Costs</span>
                    <input type="number" class="form-control w-25" aria-describedby="other-costs" id="input-other-costs"
                    v-model="otherCosts">

                    <select class="form-select " id="other-costs-units"
                    v-model="otherCostsUnits">
                        <option value="percent" >%</option>
                        <option value="dollars" selected>$</option>
                    </select>
                </div>

                <div class="input-group mb-3 col-md"></div>
            </div>


        </div>

        <div class="text-center my-3 mx-auto grid gap-3">
            <button type="button" id="calculate-button" class="btn btn-secondary me-4" @click="calculateMortgage">
                Calculate
            </button>
            <button type="button" id="reset-button" class="btn btn-danger " @click="resetForm">Reset</button>
        </div>


    </form>
    <div id="results-container" 
    v-if="displayResults == true"
    >
        <div class="container" id="overall-full-cycle-costs" >
            <div class="row" id="monthly-mortgage-payment-section">
                <div class="col">
                    <h4 class="text-center">
                        Montly Pay: <span v-html="formatCurrency(mortgagePaymentMontly)"></span>
                    </h4>
                </div>
                
            </div>
            <div class="row" id="other-mortgage-cost-split-table-section">
                <div class="col">
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Monthly</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Mortgage Payment</th>
                                    <td><span v-html="formatCurrency(mortgagePaymentMontly)"></span></td>
                                    <td><span v-html="formatCurrency(mortgagePaymentTotal)"></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Property Tax</th>
                                    <td><span v-html="formatCurrency(propertyTaxesMontly)"></span></td>
                                    <td><span v-html="formatCurrency(propertyTaxesTotal)"></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Home Insurance</th>
                                    <td><span v-html="formatCurrency(homeInsuranceMontly)"></span></td>
                                    <td><span v-html="formatCurrency(homeInsuranceTotal)"></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Other Cost</th>
                                    <td><span v-html="formatCurrency(otherCostsMontly)"></span></td>
                                    <td><span v-html="formatCurrency(otherCostsTotal)"></span></td>
                                </tr>
                                <tr>
                                    <th scope="row">Total out of pocket</th>
                                    <td><span v-html="formatCurrency  (totalOutOfPocketMontly)"></span></td>
                                    <td><span v-html="formatCurrency(totalOutOfPocketTotal)"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row" id="cost-split-graph-section">
                <ChartComponent v-if="displayResults==true" :options="costSplitChartOptions" :chartData="costSplitChartData" :chartTitle="costSplitChartTitle"/>
            </div>
            <div class="row" id="total-mortgage-cost-table-section">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">House Price</th>
                            <td><span v-html="formatCurrency(homePrice)"></span></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col">Loan Amount</th>
                            <td><span v-html="formatCurrency(mortgageAmount)"></span></td>
                        </tr>
                        <tr>
                            <th scope="col">Down Payment</th>
                            <td><span v-html="formatCurrency(downPaymentDollars)"></span></td>
                        </tr>
                        <tr>
                            <th scope="col">Total of 360 Mortgage Payments</th>
                            <td><span v-html="formatCurrency(mortgagePaymentTotal)"></span></td>
                        </tr>
                        <tr>
                            <th scope="col">Total Interest</th>
                            <td><span v-html="formatCurrency(totalInterest)"></span></td>
                        </tr>
                        <tr>
                            <th scope="col">Mortgage Payoff Date</th>
                            <td><span v-html="mortgagePayoffDate"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="container my-2" id="amortization-table">
            <h4>Amortization schedule</h4>
            <select class="form-select" aria-label="switch-amortization-monthly-yearly" v-model="amortizationSpan">
                
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
            </select>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Date</th>
                        <th scope="col">Interest</th>
                        <th scope="col">Principal</th>
                        <th scope="col">Ending Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="amortizationSpan == 'yearly'" v-for="element in amortizationTableYearly">
                        <td v-html="element.year"></td>
                        <td v-html="element.date"></td>
                        <td><span v-html="formatCurrency(element.interest)"></span></td>
                        <td><span v-html="formatCurrency(element.principal)"></span></td>
                        <td><span v-html="formatCurrency(element.endingBalance)"></span></td>
                    </tr>
                    <tr v-if="amortizationSpan == 'monthly'" v-for="element in amortizationTableMonthly">
                        <td v-html="element.year"></td>
                        <td v-html="element.date"></td>
                        <td><span v-html="formatCurrency(element.interest)"></span></td>
                        <td><span v-html="formatCurrency(element.principal)"></span></td>
                        <td><span v-html="formatCurrency(element.endingBalance)"></span></td>
                        
                    </tr>
                </tbody>
            </table>
        </div>


        
    </div>

    

</div>
    
    
</template>

<style>

</style>