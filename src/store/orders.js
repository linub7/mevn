import Axios from 'axios';


const baseUrl = 'http://localhost:3000';
const ordersUrl = `${baseUrl}/orders`;

export default {
    namespaced: true,
    state: {
        orders: []
    },
    mutations: {
        setOrders(state, data) {
            state.orders = data;
        }
    },
    actions: {
        async storeOrdersAction(context, order) {
            return (await Axios.post(ordersUrl, order)).data.id;
        },
        async setOrdersAction(context) {
            context.commit('setOrders', await (await Axios.get(ordersUrl)).data);
        }
    }
}