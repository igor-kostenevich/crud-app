<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <div class="modal__title">{{profile == {} || !profile ? 'New' : 'Update'}} user</div>
        <button class="modal__save" @click="updateProfile">Save</button>
        <span class="modal__close" @click="closeModal">
          <img src="@/assets/images/icons/close.svg" alt="" />
        </span>
      </div>
      <div class="modal__body">
        <div class="modal__upload upload">
          <div class="upload__title">Upload Photos</div>
          <div class="upload__items">
            <label
              class="upload__item"
              v-for="(item, idx) in 3"
              :key="idx"
            >
              <input @change="onFilePicked(idx, $event)" type="file" class="" accept="image/*" />
              <div class="upload__image" v-if="images[idx]">
                <img :src="images[idx]" alt="">
              </div>
            </label>
          </div>
        </div>
        <div class="modal__form form-modal">
          <div class="form-modal__title">Fill the form</div>
          <div class="form-modal__row">
            <div class="form-modal__column">
              <div class="form-modal__input">
                <v-text-field
                  v-model="profileFields.name"
                  label="Name"
                  outlined
                  rounded
                  color="#0a588b"
                  background-color="#eee"
                ></v-text-field>
              </div>
            </div>
            <div class="form-modal__column">
              <div class="form-modal__input">
                <v-text-field
                  v-model="profileFields.position"
                  label="Position"
                  outlined
                  rounded
                  color="#0a588b"
                  background-color="#eee"
                ></v-text-field>
              </div>
            </div>
            <div class="form-modal__column">
              <div class="form-modal__input">
                <v-text-field
                  v-model="profileFields.age"
                  label="Age"
                  outlined
                  rounded
                  color="#0a588b"
                  background-color="#eee"
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="form-modal__row">
            <div class="form-modal__column form-modal__column_long">
              <div class="form-modal__input">
                <v-text-field
                  v-model="profileFields.address"
                  label="Address"
                  outlined
                  rounded
                  color="#0a588b"
                  background-color="#eee"
                ></v-text-field>
              </div>
            </div>
            <div class="form-modal__column">
              <div class="form-modal__input">
                <v-text-field
                  v-model="profileFields.status"
                  label="Marital status"
                  outlined
                  shaped
                  rounded
                  color="#0a588b"
                  background-color="#eee"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileFields: {},
      images: [],
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('toggleModal', false)
    },
    updateProfile() {
      if(!!this.profile) {
        this.profileFields.images.splice(0, this.profileFields.images.length, ...this.images)
        this.$store.commit('updateProfile', {...this.profileFields, progress: this.calcProgress})
      } else {
        this.$store.commit('createProfile', {...this.profileFields, progress: this.calcProgress, id: Math.random(), images: this.images})
      }
      
      this.closeModal()
    },
    onFilePicked(idx, event) {
      const files = event.target.files
      let fileName = files[0].name

      if(fileName.lastIndexOf('.') <= 0) {
        return alert('Error')
      }

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.$set(this.images, idx, fileReader.result)
      })

      fileReader.readAsDataURL(files[0])
    }
  },
  computed: {
    calcProgress() {
      let count = this.filteredFields.length

      this.images.forEach(img => {
        if(img) {
          count++
        }
      })

      return (count * 100) / 8
    },
    filteredFields() {
      return Object.keys(this.profileFields).filter(item => this.profileFields[item] && item != 'id' && item != 'progress' && item != 'images' && item != 'mainImage')
    },
    profile() {
      return this.$store.getters.profile
    },
  },
  created() {
    if(this.images.length < 3) {
      this.images = new Array(3).fill(null)

      if(this.profile && this.profile.images && this.profile.images.length > 0) {
        this.images.splice(0, this.images.length, ...this.profile.images)
      }
    }

    if(!!this.profile && this.profile != {}) {
      Object.assign(this.profileFields, this.profile)
    }
  },
}
</script>

<style scoped lang='scss'>
.modal {
  position: relative;
  background: $gray;
  box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.1);
  width: 100%;

  &__content {
    padding: 70px 80px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
  }

  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    flex: 0 1 100%;
  }

  &__save {
    background: #0a588b;
    box-shadow: 0px 10px 15px rgba(144, 144, 144, 0.2);
    border-radius: 8px;
    font-weight: bold;
    font-size: 22px;
    line-height: 27px;
    color: $white;
    padding: 18px 83px;
    margin-right: 52px;
  }

  &__close {
    cursor: pointer;
  }
}

.upload {
  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    margin-bottom: 32px;
  }

  &__items {
    display: flex;
    justify-content: space-between;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 268px;
    width: 326px;
    cursor: pointer;
    background: $white;
    border: 2px dashed #C4C4C4;
    transition: .3s;
    position: relative;

    &:hover {
      border-color: $blue;

      &:before {
        background-position: 50% 40%;
      }
    }

    &:before {
      content: '';
      background: url('~@/assets/images/icons/upload.svg') no-repeat;
      background-position: center;
      display: inline-block;
      height: 100%;
      width: 100%;
      transition: .3s;
      position: absolute;
      z-index: 1;
    }

    input[type=file] {
      display: none;
    }
  }

  &__image {
    position: absolute;
    width: 98%;
    height: 98%;

    &:before {
      content: '';
      background: #7b7d7e;
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
    }

    img {
      position: absolute;
	    width: 100%;
    	height: 100%;
    	top: 0;
	    left: 0;
	    -o-object-fit: cover;
	    object-fit: cover;
    }
  }
}

.form-modal {
  margin-top: 74px;

  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    margin-bottom: 40px;
  }

  &__row {
    display: flex;
    margin: 0 -40px;
    margin-bottom: 50px;
  }

  &__column {
    flex: 0 1 33.333%;
    padding: 0 40px;

    &_long {
      flex: 0 1 66.666%;
    }
  }
}

.v-text-field--rounded {
  border-radius: 10px;
}
</style>

<style lang="scss">
.v-text-field--outlined .v-label--active {
  transform: translateY(-28px) translateX(-26px) scale(.75);
}
</style>
