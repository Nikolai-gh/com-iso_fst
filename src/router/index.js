import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import AuthGuard from './auth-guard'
import Login from '@/components/Auth/Login.vue'
import Registration from '@/components/Auth/Registration.vue'
import GrList from '@/components/Production/GrList.vue'
import NewProduct from '@/components/Production/NewProduct.vue'
import Gr from '@/components/Production/Gr.vue'
import Product from '@/components/Production/Product.vue'
import Products from '@/components/Production/Products.vue'
import Charact from '@/components/Production/Charact.vue'
import Customer from '@/components/Custom/Customer.vue'
import Customers from '@/components/Custom/Customers.vue'
import NewCustomer from '@/components/Custom/NewCustomer.vue'
import Order from '@/components/Ord/Order.vue'
import Orders from '@/components/Ord/Orders.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration
        },
        {
            path: '/products',
            name: 'products',
            component: Products
        },
        {
            path: '/newProduct',
            name: 'NewProduct',
            component: NewProduct,
            beforeEnter:AuthGuard
        },
        {
            path: '/gr/:id',
            props:true,
            name: 'gr',
            component: Gr,
            beforeEnter:AuthGuard
        },
        {
            path: '/grs',
            name: 'grs',
            component: GrList,
            beforeEnter:AuthGuard
        },
        {
            path: '/charac',
            name: 'charac',
            component: Charact
        },
        {
            path: '/product/:kod',
            props: true,
            name: 'product',
            component: Product
        },
        {
            path: '/customer',
            name: 'customer',
            component: Customer
        },
        {
            path: '/customers',
            name: 'customers',
            component: Customers
        },
        {
            path: '/NewCustomer',
            name: 'NewCustomer',
            component: NewCustomer
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders,
            beforeEnter:AuthGuard
        }
        ],
    mode: 'history'
})
