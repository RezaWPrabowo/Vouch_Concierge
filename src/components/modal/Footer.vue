<template>
  <div class="footer-container">
    <div class="quantity-container">
      <i
        :class="['fas fa-minus', { disabled: quantity === 0 }]"
        @click="$emit('footer-function', 'substract')"
      />

      <p>{{ quantity }}</p>

      <i
        :class="['fas fa-plus', { disabled: quantity === 9 }]"
        @click="$emit('footer-function', 'add')"
      />
    </div>

    <div
      class="button"
      :style="get_color()"
      :disabled="quantity === 0"
      @click="get_function"
    >
      {{ get_text() }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {
  @Prop() total_price: number
  @Prop() quantity: number

  get_text() {
    const qty = this.quantity

    if(qty === 0) {
      return 'Remove Item'
    }
    else if(qty === 1) {
      return 'Add to Cart'
    }
    else {
      let format_price = ''
      const split = this.total_price.toString().split('.')
      
      if(split[1]) {
        format_price = `${split[0]}.${split[1]}0` 
      }
      else {
        format_price = `${this.total_price.toString()}.00`
      }

      return `Add to Cart - SGD ${ format_price }`
    }
  }

  get_color() {
    let color
    const qty = this.quantity

    if(qty === 0) {
      color = 'orangered'
    }
    else if(qty === 1) {
      color = 'grey'
    }
    else {
      color = 'blue'
    }

    return {
      'background-color': color,
      'transition': '.4s'
    }
  }

  get_function() {
    const qty = this.quantity

    if(qty === 0) {
      this.$emit('footer-function', 'remove')
    }
    else if(qty === 1) {
      return
    }
    else {
      this.$emit('footer-function', 'cart')
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-container {
    z-index: 5000;
    background: white;
    bottom: 0;
    position: fixed;
    height: auto;
    width: calc(100% - 40px);
    padding: 0 20px 20px;
    display: flex;

    .button {
      text-align: center;
      width: 100%;
      border: none;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      font-size: 14px;
      padding: 15px 0;
    }
  }

  .quantity-container {
    display: flex;
    padding: 15px 20px;
    margin-right: 10px;
    font-size: 14px;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

    p {
      text-align: center;
      font-weight: bold;
      min-width: 15px;
      margin: 0 15px;
    }

    i {
      color: blue;
    }

    .disabled {
      opacity: 0.3;
      cursor: default;
    }
  }
</style>
