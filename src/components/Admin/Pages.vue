<template>
    <div>
        <h2>Pages</h2>
        <router-link class="btn btn-primary mb-4" to="/admin/pages/add">Add Pages</router-link>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in pages" :key="i">
                    <th class="align-middle">{{ p.name }}</th>
                    <th class="align-middle">{{ p.slug }}</th>
                    <th class="align-middle">
                        <button class="btn btn-secondary btn-sm mx-2" @click="handleEdit(p)">
                            Edit
                        </button>
                        <button class="btn btn-danger btn-sm mx-2" @click="deletePage(p)">
                            Delete
                        </button>
                    </th>
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
            ...mapState(["pages"]),
        },
        methods: {
            ...mapActions(["deletePage"]),
            handleEdit(page) {
                this.$router.push(`/admin/pages/edit/${page._id}`);
            },
        },
    };
</script>

<style>
</style>