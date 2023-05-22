<script >
    export default {
        data() {
            return {
                // form variables
                originalLoanAmount: 400000,
                originalLoanTerm: 30,
                anualInterestRate: 6,
                remainingTermYears: 25,
                remainingTermMonths: 0,

                // return variables

                // list objects

                // chart variables
            };
        },
        mounted() {
            document.title = "World of Calculators - Mortgage Payoff Calculator";
        }
    }
</script>
<template>
    <div id="main-page-wrapper" class="my-5 container-sm">
        <h1 class="text-center my-4">Mortgage Payoff Calculator</h1>

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
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__PaybackAltogether">
                    <label class="form-check-label" for="repaymentOption__PaybackAltogether">
                        Payback altogether
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__WithExtraPayments">
                    <label class="form-check-label" for="repaymentOption__WithExtraPayments">
                        Repayment with extra payments
                    </label>

                    <div class="input-group mb-3 col-md my-3">
                        <input type="number" class="form-control" placeholder="per month" >
                        <input type="number" class="form-control" placeholder="per year" >    
                        <input type="number" class="form-control" placeholder="one time" >    
                    </div>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__BiweeklyPayments">
                    <label class="form-check-label" for="repaymentOption__BiweeklyPayments">
                        Biweekly repayment
                    </label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="repaymentOption" id="repaymentOption__BiweeklyPayments">
                    <label class="form-check-label" for="repaymentOption__BiweeklyPayments">
                        Normal repayment
                    </label>
                </div>
            </div>
            
            <div class="text-center my-3 mx-auto grid gap-3">
                <button type="button" class="btn btn-secondary me-4" >
                    Calculate
                </button>
                <button type="button"  class="btn btn-danger  " >Reset</button>
            </div>

            


        </form>
    </div>
</template>