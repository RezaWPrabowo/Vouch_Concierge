<template>
  <div class="container">
    <div class="relative">
      <div class="title">Dining</div>
      <i class="fas fa-chevron-left" />
      <i class="fas fa-globe" />
      <i class="fas fa-caret-down" />
    </div>

    <Tabs
      :active="active"
      :menus="menus"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { Home } from '@/types/models'

import Tabs from '@/components/Tabs.vue'

@Component({
  components: {
    Tabs
  }
})
export default class Header extends Vue {
  @Prop() menus: Home[]
  @Prop() active: boolean
}
</script>

<style lang="scss" scoped>
  .container {
    position: sticky;
    top: 0;
    z-index: 3000;

    .relative {
      position: relative;
      display: flex;
      height: 50px;
      justify-content: center;
      align-items: center;
      background-image: url("../assets/dining.jpg");
      background-size: cover;
      transition: all 0.5s;

      &:hover {
        height: 200px;
      }

      .title {
        font-size: 24px;
        color: white;
      }

      i {
        font-size: 24px;
        position: absolute;
        color: white;
      }

      .fa-globe {
        top: 12.5px;
        right: 28px;
      }

      .fa-caret-down {
        font-size: 15px;
        top: 17.5px;
        right: 15px;
      }

      .fa-chevron-left {
        top: 12.5px;
        left: 15px;
      }
    }
  }
</style>
