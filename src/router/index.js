import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CalculatorsIndex from "../views/CalculatorsIndex.vue";
import MortgageCalc from "../views/Calculators/Financial/MortgageCalc.vue";
import MortgagePayoffCalculator from "../views/Calculators/Financial/MortgagePayoffCalculator.vue";
import PageNotFound from "../views/PageNotFound.vue";
import LoanCalculator from "../views/Calculators/Financial/LoanCalculator.vue";
import AutoLoanCalculator from "../views/Calculators/Financial/AutoLoanCalculator.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/calculators",
      name: "calculators",
      children: [
        {
          path: "",
          name: "calculatorsIndex",
          component: CalculatorsIndex,
        },
        {
          path: "mortgage",
          name: "mortgageCalculator",
          component: MortgageCalc,
        },
        {
          path: "loan-payoff",
          name: "loanPayoffCalculator",
          component: MortgagePayoffCalculator,
        },
        {
          path: "loan-calculator",
          name: "loanCalculator",
          component: LoanCalculator,
        },
        {
          path: "auto-loan-calculator",
          name: "autoLoanCalculator",
          component: AutoLoanCalculator,
        },
        
      ],
    },



    // on error pages
    {
      path: "/:catchAll(.*)",
      component: PageNotFound
    },

  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'World of Calculators';
  next();
});

export default router
