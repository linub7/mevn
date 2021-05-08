<template>
    <div>
        <h2 class="text-center p-2">
            {{ editMode ? "Edit Product" : "Add Product" }}
        </h2>
        <h4 v-if="$v.$invalid && $v.$dirty" class="bg-danger text-white text-center p-2">
            Values Required For All Fields!
        </h4>
        <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="$v.product.name.$model" />
            <ValidationError :validation="$v.product.name" />
        </div>
        <div class="form-group">
            <label for="">Description</label>
            <textarea class="form-control" rows="3" v-model="$v.product.description.$model"></textarea>
            <ValidationError :validation="$v.product.description" />
        </div>
        <div class="form-group">
            <label for="">Price</label>
            <input type="text" class="form-control" v-model="$v.product.price.$model" />
            <ValidationError :validation="$v.product.price" />
        </div>
        <div class="form-group">
            <label for="">Image</label>
            <input type="file" class="form-control" @change="onFileSelected" />
            <p class="mt-3" v-if="editMode">
                Current Image:
                <img :src="productImage + product.image" width="100" />
            </p>
        </div>
        <div class="form-group">
            <label for="">Category</label>
            <select class="form-control" @change="onChange">
                <option :value="null">Choose a Category</option>
                <option v-for="(c, i) in categories" :key="i" :value="c.slug" :selected="c.slug === product.category">
                    {{ c.name }}
                </option>
            </select>
            <ValidationError :validation="$v.product.category" />
        </div>
        <div class="text-center">
            <router-link class="btn btn-secondary m-1" to="/admin/products">Back</router-link>
            <button class="btn btn-primary m-1" to="/admin/products" @click="handleProduct">
                {{ editMode ? "Edit" : "Add" }}
            </button>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapMutations,
        mapState
    } from "vuex";
    import { required } from 'vuelidate/lib/validators';
    import ValidationError from '../ValidationError';
    export default {
        components: {
            ValidationError
        },
        data() {
            return {
                product: {
                    name: null,
                    description: null,
                    price: null,
                    image: null,
                    category: null,
                },
            };
        },
        computed: {
            ...mapState(["categories", "productImage"]),
            editMode() {
                return this.$route.params["op"] == "edit";
            },
        },
        validations: {
            product: {
                name: { required },
                description: { required },
                price: { required },
                category: { required },
            }
        },
        methods: {
            ...mapActions(["addProduct", "editProduct"]),
            ...mapMutations(["setCurrentPage"]),
            onFileSelected(e) {
                this.product.image = e.target.files[0];
            },
            onChange(e) {
                this.product.category = e.target.value;
            },
            async handleProduct() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    const product = new FormData();
    
                    product.append("name", this.product.name);
                    product.append("category", this.product.category.slug || this.product.category);
                    product.append("description", this.product.description);
                    product.append("imageUpload", this.product.image);
                    product.append("price", this.product.price);
                    if (this.editMode) {
                        product.append("id", this.product._id);
                        product.append("image", this.product.image.name);
                        await this.editProduct(product);
                    } else {
                        await this.addProduct(product);
                    }
                    this.setCurrentPage(1);
                    this.$router.push("/admin/products");
                }
            },
        },
        created() {
            if (this.editMode) {
                Object.assign(
                    this.product,
                    this.$store.getters.productById(this.$route.params["id"])
                );
            }
        },
    };
</script>

<style>
</style>