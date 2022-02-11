<template>
  <div class="notes-container">
    {{ title }}
    <p>Optional</p>

    <input
      v-model="notes"
      placeholder="Eg. No Mushroom"
      maxlength="200"
    />

    <p>{{ notes.length }}/200</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Notes extends Vue {
  @Prop() title: string
  @Prop() notes: string
}
</script>

<style lang="scss" scoped>
  .notes-container {
    padding: 20px 20px 30%;
    font-size: 18px;
    font-weight: bold;

    @media screen and (min-width: 500px) {
      padding: 20px 20px 20%;
    }

    @media screen and (min-width: 650px) {
      padding: 20px 20px 15%;
    }

    > input {
      width: 100%;
      padding: 0 0 15px;
      outline: none;
      border: none;
      border-bottom: 1px solid rgba(128, 128, 128, 0.25);

      &::placeholder {
        color: grey;
        opacity: 0.75;
      }
    }
    
    > p {
      margin: 0;
      font-size: 11px;
      font-weight: 400;
      opacity: 0.75;

      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
</style>
