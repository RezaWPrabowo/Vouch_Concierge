<template>
  <div class="tabs-container">
    <a
      :href="`#${item._id}`"
      :class="['titles', { active: active === index }]"
      v-for="(item, index) in menus"
      :key="item._id"
      @click="$emit('tab-click', index)"
    >
      {{ item.name }}
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { Home } from '@/types/models'

@Component
export default class Tabs extends Vue {
  @Prop() menus: Home[];
  @Prop() active: boolean;
}
</script>

<style lang="scss" scoped>
  .tabs-container {
    display: flex;
    height: 40px;
    margin: 0;
    background: white;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .titles {
      min-width: 25vw;
      padding: 10px;
      font-size: 12px;
      color: grey;
      text-align: center;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
      text-decoration: none;
    }

    .active {
      color: black;
      border-bottom: 3px solid blue;
      transition: all 0.3s;
    }
  }
</style>
