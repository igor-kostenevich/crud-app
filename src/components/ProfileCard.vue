<template>
  <div class="profile-card">
    <div class="profile-card__image">
      <img
        :src="profile.mainImage ? profile.mainImage : require('@/assets/images/icons/img-thumb-small.svg')" alt=""
      />
    </div>
    <div class="profile-card__info">
      <div class="profile-card__name">
        {{ profile.name ? profile.name : 'Name Surname' }}
      </div>
      <div class="profile-card__position">
        {{ profile.position ? profile.position : 'position' }}
      </div>
    </div>
    <div class="profile-card__progress">
      <v-progress-circular
        :rotate="360"
        :size="85"
        :width="5"
        :value="progressValue"
        :color="colorProgress"
      >
        <span>{{ progressValue }}</span>
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
    },
  },
  computed: {
    progressValue() {
      return this.profile.progress % 1 == 0 ? this.profile.progress.toFixed() : this.profile.progress.toFixed(1)
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
}
</script>

<style scoped lang='scss'>
.profile-card {
  display: flex;
  align-items: center;
  margin: 25px 0;
  padding: 30px 40px;
  background: $white;
  box-shadow: 0px 10px 15px rgba(145, 145, 145, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 10px 15px rgba(145, 145, 145, 0.3);
  }

  &__image {
    margin-right: 25px;
    position: relative;
    height: 85px;
    width: 85px;
    flex: 0 0 85px;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      -o-object-fit: cover;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  &__info {
    flex: 0 1 100%;
  }

  &__name {
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    margin-bottom: 7px;
  }

  &__position {
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
  }

  &__progress {
    span {
      font-weight: bold;
      font-size: 24px;
      line-height: 29px;
      color: $black;
    }
  }
}
</style>
