<template>
  <label :for="name" class="checkbox">
    <input
      type="checkbox"
      :id="name"
      @change="updateChecked"
      :checked="value"
    />
  </label>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Sauces extends Vue {
  @Prop() value: boolean
  @Prop() name: string
  @Prop() index: number
  @Prop() type: string

  updateChecked(event) {
    this.$emit('input', event.target.checked)

    if(this.type === 'Sauce') {
      this.$emit('sauce-function', `check ${this.index}`)
    }
    else if(this.type === 'Dish 1') {
      this.$emit('dish-function-1', this.index)
    }
    else if(this.type === 'Dish 2') {
      this.$emit('dish-function-2', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkbox {
    display: flex;
    align-items: center;

    & input {
      -webkit-appearance: none;
      background-color: white;
      border: 1px solid grey;
      padding: 5px;
      display: inline-block;
      position: relative;
      
      &:after {
        content: "";
        display: none;
        position: absolute;
        left: 2.5px;
        top: 0;
        width: 2px;
        height: 7px;
        border: solid grey;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }

      &:focus {
        outline: none;
      }
      
      &:checked:after {
        display: block;
      }
    }
  }
</style>