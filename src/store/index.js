import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profiles: [
      {
        name: 'John',
        position: 'Frontend',
        age: 29,
        address: null,
        status: 'solo',
        progress: 50,
        images: new Array(3).fill(null),
        id: Math.random()
      },
    ],
    selectedProfile: null,
    showModal: false
  },
  mutations: {
    createProfile(state, profile) {
      state.profiles.push(profile)
    },
    selectProfile(state, profile) {
      state.selectedProfile = profile
    },
    deleteProfile(state, id) {
      const idx = state.profiles.findIndex(profile => profile.id === id)
      state.profiles.splice(idx, 1)
      state.selectedProfile = null
    },
    toggleModal(state, payload) {
      state.showModal = payload
    },
    updateCurrentImage(state, data) {
      const idx = state.profiles.findIndex(profile => profile.id === data.id)
      Vue.set(state.profiles, idx, data)
    },
    updateProfile(state, data) {
      const idx = state.profiles.findIndex(profile => profile.id === data.id)
      Vue.set(state.profiles, idx, data)
      state.selectedProfile = null
    }
  },
  getters: {
    profiles: state => state.profiles,
    profile: state => state.selectedProfile,
    showModal: state => state.showModal
  }
})
