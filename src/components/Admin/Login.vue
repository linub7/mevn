<template>
    <div class="mt-5">
        <h4 v-if="showFailureMessage" class="bg-danger text-white text-center">
            Authentication Failed, please try again
        </h4>
        <div class="form-group">
            <label for="">Username</label>
            <input class="form-control" type="text" v-model="username" />
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input class="form-control" type="password" v-model="password" />
        </div>

        <div class="text-center">
            <button class="btn btn-primary m-1" @click="handleAuth">Login</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                username: "admin",
                password: "pass",
                showFailureMessage: false
            };
        },
        computed: {
            ...mapState({ authenticated: state => state.auth.authenticated })
        },
        methods: {
            ...mapActions({ authenticate: "auth/authenticate" }),
            async handleAuth() {
                await this.authenticate({
                    username: this.username,
                    password: this.password
                })

                if (this.authenticated) {
                    this.$router.push("/admin");
                } else {
                    this.showFailureMessage = true;
                }
            }
        },
    };
</script>

<style>
</style>