<template>
  <div class="padding">
    <div class="fixed-button" @click="$emit('close')">
      <div class="close-button" />
    </div>

    <div class="image-container">
      <img :src="test_img[active_img]" alt="" @touchstart="touch_start" />
      
      <div class="discount-tag" v-if="data.is_discount">
        <i class="fas fa-percentage" />
      </div>
    </div>

    <div class="dots-container">
      <div :class="[{ active: active_img === index }]" v-for="(dot, index) in 3" :key="index">
        <span />
      </div>
    </div>

    <div class="detail-container">
      <p class="name">{{ data.name }}</p>

      <p class="description">{{ data.description }}</p>

      <div class="tag-container">
        <div class="tag" v-for="(tag, index) in data.tags" :key="index">
          {{ formatTag(tag) }}
        </div>
      </div>

      <div class="price-tag">
        <p>
          SGD {{ data.display_price }}
        </p>

        <p v-if="data.is_discount">
          SGD {{ data.price }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { MenuItem } from '@/types/models'

import Tabs from '@/components/Tabs.vue'

@Component({
  components: {
    Tabs
  }
})
export default class Header extends Vue {
  @Prop() data: MenuItem
  @Prop() show: boolean

  active_img = 0;

  test_img: string[] = []

  created() {
    this.test_img.push(this.data.image_url)
    this.test_img.push('https://picsum.photos/id/10/2500/1667')
    this.test_img.push('https://picsum.photos/id/1000/5626/3635')
  }

  touch_start (touchEvent) {
    if (touchEvent.changedTouches.length !== 1) {
      return
    }

    const pos_start = touchEvent.changedTouches[0].clientX

    addEventListener('touchend', (touchEvent) => this.touch_end(touchEvent, pos_start), {once: true})
  }

  touch_end (touchEvent, pos_start) {
    if (touchEvent.changedTouches.length !== 1) {
      return
    }

    const pos_end = touchEvent.changedTouches[0].clientX

    if (pos_start < pos_end) {
      if(this.active_img === 0) {
        this.active_img = 2;
      }
      else {
        this.active_img -= 1;
      }
    } else if (pos_start > pos_end) {
      if(this.active_img === 2) {
        this.active_img = 0;
      }
      else {
      this.active_img += 1;
      }
    }
  }

  formatTag(tag: string) {
    let split = tag.split('_')

    for(let i = 0; i < split.length; i++) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1)
    }

    return split.join(' ')
  }
}
</script>

<style lang="scss" scoped>
  .padding {
    position: relative;
    padding: 10px 20px;
  }

  .fixed-button {
    z-index: 5000;
    margin : 0 20px;
    position: fixed;
    bottom: calc(75vh - 25px);
    left: 0;
    width: calc(100% - 40px);
    height: 25px;
    background: white;
  }

  .close-button {
    margin: 10px auto;
    width: 50px;
    height: 5px;
    background: grey;
    opacity: 0.3;
    border-radius: 10px;
  }

  .image-container {
    position: relative;
    margin-top: 20px;

    > img {
      width: 100%;
      height: 25vh;
      object-fit: cover;
      border-radius: 20px;
    }
  }

  .dots-container {
    display: flex;
    justify-content: center;

    > div {
      width: 10px;
      height: 5px;
      margin: 10px 5px;
      background: rgba(128, 128, 128, 0.5);
      transition: all 0.5s;
    }

    > .active {
      width: 20px;
      background: grey;
      transition: all 0.5s;
    }
  }

  .detail-container {
    display: flex;
    flex-direction: column;

    .name {
      margin: 15px 0 5px;
      font-size: 18px;
      color: black;
    }

    .description {
      margin: 5px 0 15px;
      font-size: 12px;
      color: grey;
    }
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tag {
    font-size: 8px;
    border-radius: 15px;
    background: lightblue;
    color: blue;
    white-space: nowrap;
    padding: 10px;
  }

  .price-tag {
    display: flex;
    margin-top: 5px;

    > p {
      margin: 10px 0 0 0;
      font-size: 14px;
      font-weight: bold;

      &:nth-child(2) {
        margin-left: 15px;
        opacity: 0.25;
      }
    }
  }

  .discount-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    background: red;
    border-radius: 5px;
    padding: 3px 7px;

    i {
      color: white;
    }
  }
</style>
