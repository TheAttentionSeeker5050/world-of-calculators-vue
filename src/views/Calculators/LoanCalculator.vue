<script >

    export default {
        data() {
            return {

            }
        },
        components: {

        },
        methods: {
            calculateLoan() {
                console.log("calculateLoan");
            },
            resetForm() {
                console.log("resetForm");
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
                    <input type="number" class="form-control" placeholder="Loan Amount" aria-label="Loan Amount">
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Loan Term:</span>
                    <input type="number" class="form-control" placeholder="Years" aria-label="Years">
                    <span class="input-group-text">Years</span>
                    <input type="number" class="form-control" placeholder="Months" aria-label="Months">
                    <span class="input-group-text">Months</span>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Interest Rate:</span>
                    <input type="number" class="form-control" placeholder="Interest Rate" aria-label="Interest Rate">
                    <span class="input-group-text">%</span>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Payment Frequency:</span>
                    <select class="form-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="monthly">Monthly</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="input-group mb-3 col-md">
                    <span class="input-group-text">Compound Every:</span>
                    <select class="form-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="anually">Anually</option>
                        <option value="semi-anually">Semi Anually</option>
                        <option value="quarterly">Quarterly</option>
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
    </div>
</template>