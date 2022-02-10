<template>
  <div>
    <div
      v-for="(item, index) in menus"
      :id="item._id"
      :key="item._id"
    >
      <div class="title">
        {{ item.name }}
      </div>

      <div :class="[{ 'horizontal': index === 0 }]">
        <div
          :class="[{
             'margin-card-h': index === 0,
             'margin-card-v': index !==0
          }]"
          v-for="list in item.items"
          :key="list._id"
        >
          <HorizontalCard
            v-if="index === 0"
            :data="list"
            v-on="$listeners"
          />
          
          <VerticalCard
            v-else
            :data="list"
            v-on="$listeners"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { Home } from '@/types/models'

import HorizontalCard from '@/components/cards/HorizontalCard.vue'
import VerticalCard from '@/components/cards/VerticalCard.vue'

@Component({
  components: {
    HorizontalCard,
    VerticalCard
  }
})
export default class Body extends Vue {
  @Prop() menus: Home[]
}
</script>

<style lang="scss" scoped>
  .title {
    margin-top: 20px;
    padding-left: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .horizontal {
    min-height: 44vh;
    display: flex;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .margin-card-h {
    &:first-child {
      margin: 0 10px 0 20px;
    }

    &:not(:first-child):not(:last-child) {
      margin: 0 10px;
    }

    &:last-child {
      margin: 0 20px 0 10px;
    }
  }

  .margin-card-v {
    margin: 20px;
  }
</style>
