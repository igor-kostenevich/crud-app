<template>
  <div class="photo-card">
    <div class="photo-card__main">
      <img :src="currentImage ? currentImage : images[0] ? images[0] : require('@/assets/images/icons/img-thumb.svg')" alt="" :class="[{'active': currentImage}]">
    </div>
    <div class="photo-card__preview">
      <span
        v-for="(image, idx) in images"
        :key="idx" @click="setCurrentImage(image)"
        :class="[{'active': currentImage === image}]"
      >
        <img :src="image ? image : require('@/assets/images/icons/img-thumb-small.svg')" alt="" :style="{'cursor': image ? 'pointer' : ''}">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array
  },
  data() {
    return {
      currentImage: ''
    }
  },
  methods: {
    setCurrentImage(image) {
      if(!image) {
        return false
      }

      this.currentImage = image
      this.$emit('changeCurrImage', this.currentImage)
    }
  },
}
</script>

<style scoped lang='scss'>
.photo-card {
  max-width: 412px;
}

.photo-card__main {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $darkgray;
  height: 600px;
  width: 412px;
  border-radius: 10px;
  margin-bottom: 20px;
  position: relative;

  img {
    top: 0;
	  left: 0;
	  -o-object-fit: cover;
	  object-fit: cover;

    &.active {
      position: absolute;
	    width: 100%;
      height: 100%;
    }
  }
}

.photo-card__preview {
  display: flex;
  justify-content: flex-end;

  span {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 84px;
    background: $darkgray;
    border-radius: 50%;
    position: relative;

    &.active {
      border: 2px solid $green;
    }
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 50%
  }
}
</style>
