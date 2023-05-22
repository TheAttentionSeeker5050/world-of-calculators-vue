<script >
    export default {
        mounted() {
            document.title = "World of Calculators - Calculator Index";
        }
    }
</script>
<template>
    <div id="main-page-wrapper" class="container-sm my-4">

        <h1 class="text-center my-4">
            All Calculators
        </h1>

        <h2>Financial Calculators</h2>
        <ul>
            <li><a href="/calculators/mortgage">Mortgage Calculator</a></li>
            <li><a href="/calculators/loan-payoff">Loan Payoff Calculator</a></li>
            <li><a href="">Debt Amortization Calculator</a></li>
        </ul>

        <h2>Math & Physics Calculators</h2>
        <ul>
            <li><a href="">Calculator 1</a></li>
            <li><a href="">Calculator 2</a></li>
            <li><a href="">Calculator 3</a></li>
        </ul>

    </div>
</template>