<script setup>

</script>
<template>

<nav class="navbar navbar-expand-lg primary-emphasis py-3 px-1 bg-primary " id="g-navbar">
    <div class="container-fluid ">
        <a class="navbar-brand text-white" href="#">World Of Calculators</a>
        <button class="navbar-toggler bg-white primary" id="expanding-menu-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>


        <div class="collapse navbar-collapse"  id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active text-white" aria-current="page" href="/">Home</a>
            </li>

            <li class="nav-item">
                <a class="nav-link text-white" aria-current="page" href="/about">About</a>
            </li>
            
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Featured Calculators </a>
                <ul class="dropdown-menu background-color-purple bg-primary">
                    
                    <li><a class="dropdown-item text-white" href="/calculators/mortgage">Mortgage Calculator</a></li>
                    <li><a class="dropdown-item text-white" href="/calculators/loan-payoff">Mortgage/loan Payoff Calculator</a></li>
                    <li><a class="dropdown-item text-white" href="/calculators/loan-calculator">General Loan Calculator</a></li>
                    
                </ul>
            </li>

            <li class="nav-item">
                <a class="nav-link text-white" aria-current="page" href="/calculators">All Calculators</a>
            </li>
        </ul>
        <form class="d-flex" role="search" id="navbar-search-component">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success background-color-white bg-white text-primary" type="submit">Search</button>
        </form>
        </div>
    </div>
</nav>

</template>