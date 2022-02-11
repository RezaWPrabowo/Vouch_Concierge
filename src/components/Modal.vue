<template>
  <div
    v-show="show"
    class="modal-container"
  >
    <div class="backdrop" @click="$emit('close')" />

    <div :class="['modal-content', { show: show }]">
      <TopContent
        :data="data"
        :show="show"
        v-on="$listeners"
      />

      <div class="card-gap" />

      <Variants
        :variant-option="detail.variants"
        :selected="selected_variant"
        @variant-select="variant_select"
      />

      <div class="card-gap" />

      <Sauces
        :title="detail.addons[0].addon_cateogry_name"
        :sauce-data="sauce_data"
        @sauce-function="sauce_function"
      />

      <div class="card-gap" />

      <Extra
        :title1="detail.addons[1].addon_cateogry_name"
        :title2="detail.addons[2].addon_cateogry_name"
        :dish-data1="extra_dish_1"
        :dish-data2="extra_dish_2"
        @dish-function-1="dish_function_1"
        @dish-function-2="dish_function_2"
      />

      <div class="card-gap" />

      <Notes title="Notes" :notes="notes" />

      <Footer
        :total_price="total_price"
        :quantity="quantity"
        @footer-function="footer_function"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

import { MenuItem, Detail, VariantsOption, CartPayload } from '@/types/models'

import TopContent from '@/components/modal/TopContent.vue'
import Variants from '@/components/modal/Variants.vue'
import Sauces from '@/components/modal/Sauces.vue'
import Extra from '@/components/modal/Extra.vue'
import Notes from '@/components/modal/Notes.vue'
import Footer from '@/components/modal/Footer.vue'

@Component({
  components: {
    TopContent,
    Sauces,
    Variants,
    Extra,
    Notes,
    Footer
  }
})
export default class Modal extends Vue {
  @Prop() data: MenuItem
  @Prop() detail: Detail
  @Prop() show: boolean

  selected_variant: VariantsOption = null

  sauce_data: CartPayload[] = []
  extra_dish_1: CartPayload[] = []
  extra_dish_2: CartPayload[] = []

  notes: string = ''
  total_price: number = 0
  quantity: number = 1

  created() {
    this.total_price = this.data.display_price

    this.init_data()
  }

  reset_data() {
    this.sauce_data = []
    this.extra_dish_1 = []
    this.extra_dish_2 = []
    this.selected_variant = null
    this.notes = ''
    this.total_price = 0
    this.quantity = 1
  }

  init_data() {
    this.init_sauce()
    this.init_dishes()
  }

  async init_sauce() {
    const reverseSauce = await this.get_data(0).reverse()

    await reverseSauce.map((data) => (
      this.sauce_data.push({
        checked: false,
        name: data.name,
        quantity: 0,
        additional_price: data.additional_price
      })
    ))
  }

  async init_dishes() {
    const reverseDish1 = await this.get_data(1)
    const reverseDish2 = await this.get_data(2)

    await reverseDish1.map((data) => (
      this.extra_dish_1.push({
        checked: false,
        name: data.name,
        additional_price: data.additional_price
      })
    ))

    await reverseDish2.map((data) => (
      this.extra_dish_2.push({
        checked: false,
        name: data.name,
        additional_price: data.additional_price
      })
    ))
  }

  get_data(index: number) {
    return this.detail.addons[index].addon_items
  }

  variant_select(index: number) {
    this.selected_variant = this.detail.variants[index]
  }

  sauce_function(command: string) {
    const split: string[] = command.split(' ')
    const index: number = parseInt(split[1])

    if(split[0] === 'add' && this.sauce_data[index].quantity < 9) {
      this.sauce_data[index].quantity += 1
      this.total_price += this.sauce_data[index].additional_price
    }
    else if(split[0] === 'substract') {
      this.sauce_data[index].quantity -= 1
      this.total_price -= this.sauce_data[index].additional_price

      if(this.sauce_data[index].quantity === 0) {
        this.sauce_data[index].checked = false
      }
    }
    else if(split[0] === 'check') {
      if(this.sauce_data[index].checked === true) {
        this.sauce_data[index].quantity = 1
        this.total_price += this.sauce_data[index].additional_price
      }
      else if(this.sauce_data[index].checked === false) {
        this.total_price -= this.sauce_data[index].additional_price * this.sauce_data[index].quantity
        this.sauce_data[index].quantity = 0
      }
    }
  }

  dish_function_1(index: number) {
    if(this.extra_dish_1[index].checked === true) {
      this.total_price += this.extra_dish_1[index].additional_price
    }
    else if(this.extra_dish_1[index].checked === false) {
      this.total_price -= this.extra_dish_1[index].additional_price
    }
  }

  dish_function_2(index: number) {
    if(this.extra_dish_2[index].checked === true) {
      this.total_price += this.extra_dish_2[index].additional_price
    }
    else if(this.extra_dish_2[index].checked === false) {
      this.total_price -= this.extra_dish_2[index].additional_price
    }
  }

  footer_function(command: string) {
    if(command === 'add' && this.quantity < 9) {
      this.quantity += 1
      this.total_price += this.data.display_price
    }
    else if(command === 'substract' && this.quantity > 0) {
      this.quantity -= 1
      this.total_price -= this.data.display_price
    }
    else if(command === 'remove') {
      this.$emit('close')
      this.reset_data()
      this.init_data()
    }
    else if(command === 'cart') {
      alert('Lets all just pretend that this function works')
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-container {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .modal-content {
    animation: slide-up .4s cubic-bezier(0.4, 0, 0.2, 1) 0ms backwards;
    position: fixed;
    overflow-x: auto;
    border-radius: 20px 20px 0 0;
    z-index: 4000;
    width: 100%;
    height: 75vh;
    margin-bottom: -75vh;
    bottom: 0;
    background: white;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .card-gap {
    width: 100%;
    height: 10px;
    background: rgba(128, 128, 128, 0.1);
  }

  .backdrop {
    z-index: 3000;
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }

  .relative {
    position: relative;
  }

  .show {
    margin-bottom: 0;
  }

  @keyframes slide-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>