<template>
  <aside class="aside">
    <div class="aside-content">
      <div class="aside__header">
        <span class="aside__arrows">
          <img src="@/assets/images/icons/arrows.svg" alt="" />
        </span>
        <button class="aside__create" @click="createProfile">
          <img src="@/assets/images/icons/user.svg" alt="" />
        </button>
      </div>
      <div class="aside__body">
        <template v-if="profiles.length">
          <ProfileCard
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
            @click.native="selectProfile(profile)"
          />
        </template>
        <template v-else>
          <div class="title center"><br>Create first profile</div>
        </template>
      </div>
    </div>
  </aside>
</template>

<script>
import ProfileCard from '@/components/ProfileCard'

export default {
  components: {
    ProfileCard,
  },
  methods: {
    createProfile() {
      this.$store.commit('toggleModal', true)
    },
    selectProfile(profile) {
      this.$store.commit('selectProfile', profile)
    }
  },
  computed: {
    profiles() {
      return this.$store.getters.profiles
    }
  }
}
</script>

<style scoped lang='scss'>
.aside {
  // flex: 0 0 31.25%;
  flex: 0 0 600px;
  padding: 50px 0;
  background: $gray;
  max-height: 100vh;
  overflow-y: auto;

  @media (max-width: 1800px) {
    flex: 0 1 350px;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background-color: $blue;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: $blue;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #f9f9fd;
  }
}

.aside-content {
  max-width: 520px;
  margin: 0 auto;
}

.aside__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 2px solid $blue;
}

.aside__create {
  background: $blue;
  border: 1px solid #0a588b;
  box-shadow: 0px 5px 10px rgba(144, 144, 144, 0.35);
  border-radius: 50%;
  padding: 10px;
}
</style>
