import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalculatorsIndex from "../views/CalculatorsIndex.vue"
import MortgageCalc from "../views/Calculators/MortgageCalc.vue"

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
      ],
    },
    // {
    //   path: "/calculators/mortgage",
    //       name: "mortgageCalculator",
    //       component: MortgageCalc,
    // },

  ]
})

export default router
