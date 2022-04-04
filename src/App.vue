<template>
  <div class="wrapper">
    <div class="container-app">
      <Aside />
      <component :is="isOpenModal ? 'CreateAndEditProfile' : 'Dashboard'"></component>
    </div>
  </div>
</template>

<script>
import Aside from './components/Aside'
import Dashboard from './components/Dashboard.vue'
import CreateAndEditProfile from './components/CreateAndEditProfile.vue'

export default {
  name: 'App',
  components: {
    Aside,
    Dashboard,
    CreateAndEditProfile,
  },
  computed: {
    isOpenModal() {
      return this.$store.getters.showModal
    }
  }
}
</script>

<style lang="scss">

</style>
