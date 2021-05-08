<template>
    <div>
        <h2>Orders</h2>
        
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Address</th>
                    <th>Order Content</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(o, i) in orders" :key="i">
                    <th class="align-middle">{{ o.name }}</th>
                    <th class="align-middle">{{ o.email }}</th>
                    <th class="align-middle">{{ o.address }}</th>
                    <th class="align-middle">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="(item, index) in JSON.parse(o.cart)" :key="index">
                                {{ item.product.name }}
                                {{ item.product.price | currency }}
                                {{ "x " + item.quantity }}
                            </li>
                        </ul>
                    </th>
                    <th class="align-middle">{{ o.total | currency }}</th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from "vuex";
    export default {
        computed: {
            ...mapState({
                orders: state => state.orders.orders
            }),
        },
        methods: {
            ...mapActions({
                setOrdersAction: "orders/setOrdersAction"
            })
        },
        created() {
            this.setOrdersAction();
        },
    };
</script>

<style>
</style>