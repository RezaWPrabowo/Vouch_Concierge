<template>
  <div class="variants-container">
    Variants

    <div :class="['dropdown-container', { 'remove-border': selected }]" @click="isOpen = !isOpen">
      <div class="dropdown-placeholder">
        <p :class="[{ placeholder: !selected }]">
          {{ !selected ? 'Choose One' : selected.name }}
        </p>

        <i :class="['fas fa-caret-down', { 'transform-icon': isOpen }]" />
      </div>
    </div>

    <div v-show="isOpen" class="dropdown-options-container">
      <div
        class="dropdown-options"
        v-for="(option, index) in variantOption"
        :key="index"
        @click="option_select(index)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { VariantsOption } from '@/types/models'

@Component
export default class Variants extends Vue {
  @Prop() variantOption: VariantsOption[]
  @Prop() selected: VariantsOption

  isOpen: boolean = false

  option_select(index: number) {
    this.$emit('variant-select', index)
    this.isOpen = !this.isOpen
  }
}
</script>

<style lang="scss" scoped>
  .variants-container {
    position: relative;
    padding: 20px;
    font-size: 18px;
    font-weight: bold;
  }
  
  .dropdown-container {
    margin-top: 10px;
    padding: 15px;
    border: 1px solid grey;
    border-radius: 10px;
  }

  .remove-border {
    border: none;
    border-bottom: 1px solid grey;
  }

  .dropdown-placeholder {
    display: flex;
    color: black;
    font-size: 14px;
    font-weight: 400;

    &:hover {
      font-weight: bold;
    }

    p {
      flex: 1;
      margin: 0;
    }

    i {
      font-size: 20px;
      transition: .5s;
    }

    .transform-icon {
      transform: rotate(-180deg);
    }

    .placeholder {
      opacity: 0.5;

      &:hover {
        font-weight: 400;
      }
    }
  }

  .dropdown-options-container {
    animation: slide-down .5s cubic-bezier(0.4, 0, 0.2, 1) 0ms forwards;
    position: absolute;
    z-index: 2000;
    top: calc(100% - 20px);
    width: calc(100% - 40px);
    border-radius: 10px;

    .dropdown-options {
      padding: 15px;
      font-size: 14px;
      font-weight: 400;
      background: white;

      border-bottom: 1px solid rgba(128, 128, 128, 0.25);

      &:hover {
        font-weight: bold;
      }
    }
  }

  @keyframes slide-down {
    0% {
      top: 75%;
      opacity: 0;
    }
    100% {
      top: calc(100% - 20px);
      opacity: 1;
    }
  }
</style>
