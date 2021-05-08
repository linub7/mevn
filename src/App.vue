<template>
  <div class="container">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    ...mapActions(['setPagesAction', 'setCategoriesAction']),
    ...mapActions({ initializeCart: "cart/initializeCart" })
  },
  created() {
    this.setPagesAction();
    this.setCategoriesAction();
    this.initializeCart(this.$store);
  },
}
</script>

