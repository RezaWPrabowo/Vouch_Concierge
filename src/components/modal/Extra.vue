<template>
  <div class="dishes-container">
    {{ title1 }}

    <div class="dishes-lists">
      <div class="dishes-list" v-for="(item, index) in dishData1" :key="index">
        <p>{{ item.name }}</p>

        <p>SGD {{ item.additional_price }}.00</p>

        <Checkbox
          v-model="item.checked"
          type="Dish 1"
          :index="index"
          :name="item._id"
          v-on="$listeners"
        />
      </div>
    </div>

    <div class="dashed-border" />

    {{ title2 }}

    <div class="dishes-lists">
      <div class="dishes-list" v-for="(item, index) in dishData2" :key="index">
        <p>{{ item.name }}</p>

        <p>SGD {{ item.additional_price }}.00</p>

        <Checkbox
          v-model="item.checked"
          type="Dish 2"
          :index="index"
          :name="item._id"
          v-on="$listeners"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { CartPayload } from '@/types/models'

import Checkbox from '@/components/elements/CheckBox.vue'

@Component({
  components: {
    Checkbox
  }
})
export default class Extra extends Vue {
  @Prop() title1: string
  @Prop() title2: string
  @Prop() dishData1: CartPayload[]
  @Prop() dishData2: CartPayload[]
}
</script>

<style lang="scss" scoped>
  .dishes-container {
    position: relative;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
  }

  .dishes-lists {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    
    .dishes-list {
      display: flex;
      padding: 20px 0;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(128, 128, 128, 0.25);
      }

      > p {
        margin: 0;

        &:first-child {
          flex: 1;
        }

        &:not(:first-child) {
          font-weight: bold;
          margin-right: 10px;
        }
      }
    }
  }
  

  .dashed-border {
    border-bottom: 1px dashed rgba(128, 128, 128, 0.5);
    margin: 0 0 20px;
  }
</style>
