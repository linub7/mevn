<template>
    <div>
        <h2>Products</h2>
        <router-link class="btn btn-primary mb-4" to="/admin/products/add">Add Products</router-link>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in products" :key="i">
                    <th class="align-middle">{{ p.name }}</th>
                    <th class="align-middle">
                        <img :src="productImage + p.image" width="100">
                    </th>
                    <th class="align-middle">{{ p.price | currency }}</th>
                    <th class="align-middle">{{ p.category }}</th>
                    <th class="align-middle">
                        <button class="btn btn-secondary btn-sm mx-2" @click="handleEdit(p)">
                            Edit
                        </button>
                        <button class="btn btn-danger btn-sm mx-2" @click="deleteProduct(p)">
                            Delete
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>
        <ProductPagination />
    </div>
</template>

<script>
    import ProductPagination from '../ProductPagination';
    import {
        mapActions,
        mapMutations,
        mapState
    } from "vuex";
    export default {
        components: {
            ProductPagination
        },
        computed: {
            ...mapState(["products", "productImage"]),
        },
        methods: {
            ...mapMutations(["setCurrentCategory"]),
            ...mapActions(["setProductsByCategoryAction", "deleteProduct"]),
            handleEdit(product) {
                this.$router.push(`/admin/products/edit/${product._id}`);
            }
        },
        created() {
            this.setCurrentCategory("all");
            this.setProductsByCategoryAction("all");
        },
    };
</script>

<style>
</style>