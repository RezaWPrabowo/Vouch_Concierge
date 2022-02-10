<template>
  <div class="container">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { MenuItem } from '@/types/models'

@Component
export default class Tabs extends Vue {
  @Prop() data: MenuItem[];
  @Prop() modal: boolean;
}
</script>

<style lang="scss" scoped>
  .container {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>