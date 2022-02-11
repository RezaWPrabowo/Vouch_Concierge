<template>
  <div class="sauces-container">
    {{ title }}

    <div class="sauces-lists">
      <div class="sauces-list" v-for="(item, index) in sauceData" :key="index">
        <p>{{ item.name }}</p>

        <div class="quantity-container" v-if="item.checked && item.quantity > 0">
          <i
            :class="['fas fa-minus']"
            @click="$emit('sauce-function', `substract ${index}`)"
          />

          <p>{{ item.quantity }}</p>

          <i
            :class="['fas fa-plus', { disabled: item.quantity === 9 }]"
            @click="$emit('sauce-function', `add ${index}`)"
          />
        </div>

        <p>SGD {{ item.additional_price }}</p>

        <Checkbox
          v-model="item.checked"
          type="Sauce"
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
export default class Sauces extends Vue {
  @Prop() title: string
  @Prop() sauceData: CartPayload[]
}
</script>

<style lang="scss" scoped>
  .sauces-container {
    position: relative;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
  }

  .sauces-lists {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
  }

  .quantity-container {
    display: flex;
    margin-right: 20px;
    font-size: 14px;
    align-items: center;

    p {
      font-weight: bold;
      margin: 0 10px;
    }

    i {
      color: blue;
    }
  }

  .sauces-list {
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

    .disabled {
      opacity: 0.3;
      cursor: default;
    }
  }
</style>
