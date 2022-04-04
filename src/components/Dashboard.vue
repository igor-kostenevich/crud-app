<template>
  <section class="dashboard">
    <div class="dashboard-content" v-if="profile">
      <div class="dashboard__column">
        <Photo :images="profile.images" @changeCurrImage="setCurrentImage($event)"/>
      </div>
      <div class="dashboard__column">
        <div class="profile-progress">
          <span>profile completed on</span>
          <v-progress-linear
            v-model="progressValue"
            height="30"
            :color="colorProgress"
            background-color="#E4F1FA"
            rounded
          >
            <strong class="progress-tooltip">{{ progressValue }}%</strong>
          </v-progress-linear>
        </div>
        <div class="profile-info">
          <div class="profile-info__header">
            <div class="profile-info-header__column">
              <div class="profile-info__title">Personal Data</div>
              <div class="profile-info__alterations">
                <div class="profile-info__updated">updated at: 07.09.2019</div>
                <div class="profile-info__edition">number of editions: 1</div>
              </div>
            </div>
            <div class="profile-info-header__column">
              <div class="profile-info__actions">
                <img @click="showModal" src="@/assets/images/icons/edit.svg" alt="" />
                <img @click="deleteProfile(profile.id)" src="@/assets/images/icons/delete.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="profile-info__body">
            <ul class="user-info-list">
              <li>
                <span>Name:</span>
                <span>{{ profile.name ? profile.name : '-' }}</span>
              </li>
              <li>
                <span>Position:</span>
                <span>{{ profile.position ? profile.position : '-' }}</span>
              </li>
              <li>
                <span>Age:</span>
                <span>{{ profile.age ? profile.age : '-' }}</span>
              </li>
              <li>
                <span>Address:</span>
                <span>{{ profile.address ? profile.address : '-' }}</span>
              </li>
              <li>
                <span>Marital status:</span>
                <span>{{ profile.status ? profile.status : '-' }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="title center">Choose profile</div>
  </section>
</template>

<script>
import Photo from '@/components/Photo'
export default {
  methods: {
    setCurrentImage(curImg) {
      this.$store.commit('updateCurrentImage', {...this.profile, mainImage: curImg})
    },
    deleteProfile(id) {
      this.$store.commit('deleteProfile', id)
    },
    showModal() {
      this.$store.commit('toggleModal', true)
    }
  },
  computed: {
    progressValue() {
      return this.profile.progress % 1 == 0 ? this.profile.progress.toFixed() : this.profile.progress.toFixed(1)
    },
    profile() {
      return this.$store.getters.profile
    },
    colorProgress() {
      if (this.profile.progress < 50) {
        return '#FF5A5F'
      } else if (this.profile.progress >= 50 && this.profile.progress < 70) {
        return '#FFD166'
      } else if (this.profile.progress >= 70 && this.profile.progress < 100) {
        return '#06D6A0'
      } else if (this.profile.progress === 100) {
        return '#0A588B'
      }
    },
  },
  components: {
    Photo,
  },
}
</script>

<style scoped lang='scss'>
.dashboard {
  // flex: 0 1 68.75%;
  padding: 125px 125px 150px 125px;
  flex: 0 1 100%;
  background: $white;

  &__column {
    position: relative;
    z-index: 2;

    &:first-child {
      padding-right: 20px;
    }

    &:last-child {
      padding-top: 10px;
      width: 100%;
    }
  }
}

.profile-progress {
  pointer-events: none;
  padding: 0 20px;

  &__image {
    img {
      max-width: 100%;
    }
  }

  span {
    display: inline-block;
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
}

.dashboard-content {
  display: flex;
  max-width: 1075px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 35px;

  &:before {
    content: '';
    background: $gray;
    border-radius: 10px;
    position: absolute;
    left: 10%;
    right: -2.5%;
    bottom: 0;
    top: 20%;
    z-index: 0;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.profile-info {
  padding-top: 90px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    margin-bottom: 5px;
  }

  &__alterations {
    display: flex;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }

  &__edition {
    margin-left: 45px;
  }

  &__actions {
    img {
      cursor: pointer;
    }
  }


  &__body {
    padding-top: 68px;
  }
}

.user-info-list {
  li {
    display: flex;
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  span {
    display: inline-block;
    flex-direction: row;

    &:first-child {
      text-align: right;
      flex: 0 0 155px;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
    }

    &:last-child {
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      margin-left: 15px;
    }
  }
}

.progress-tooltip {
  color: $white;
  font-family: 'Montserrat', sans-serif;
}

.v-progress-linear--rounded {
  border-radius: 20px;
}
</style>
