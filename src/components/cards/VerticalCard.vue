<template>
  <div class="card-container" @click="$emit('menu-click', data)">
    <div class="card-content">
      <div class="flex-one">
        <p class="name">{{ data.name }}</p>

        <p class="description">{{ data.description }}</p>
      </div>
      
      <div>
        <div class="tag-container">
          <div class="tag" v-for="(tag, index) in data.tags" :key="index">
            {{ formatTag(tag) }}
          </div>
        </div>

        <div class="price-tag">
          <p>
            SGD {{ data.display_price }}
          </p>

          <p v-if="data.is_discount">
            SGD {{ data.price }}
          </p>
        </div>
      </div>
    </div>

    <img :src="data.image_url" alt="" />

    <div class="discount-tag" v-if="data.is_discount">
      <i class="fas fa-percentage" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { MenuItem } from '@/types/models'

@Component
export default class VerticalCard extends Vue {
  @Prop() data: MenuItem[];

  formatTag(tag: string) {
    let split = tag.split('_')

    for(let i = 0; i < split.length; i++) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1)
    }

    return split.join(' ')
  }
}
</script>

<style lang="scss" scoped>
  .card-container {
    position: relative;
    display: flex;
    border-radius: 15px;
    width: 100%;
    height: 20vh;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

    img {
      width: 40%;
      height: 100%;
      object-fit: cover;
      border-radius: 0 15px 15px 0;
    }

    .discount-tag {
      position: absolute;
      top: 15px;
      right: 15px;
      background: red;
      border-radius: 5px;
      padding: 3px 7px;

      i {
        color: white;
      }
    }

    .card-content {
      width: 60%;
      height: 100%;
      display: flex;
      flex-direction: column;

      p {
        margin: 5px 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .name {
        font-size: 14px;
        color: black;
      }

      .description {
        font-size: 10px;
        color: grey;
      }
    }
  }

  .tag-container {
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .tag {
    font-size: 8px;
    border-radius: 15px;
    background: lightblue;
    color: blue;
    white-space: nowrap;
    padding: 7.5px;

    &:first-child {
      margin: 0 5px 0 15px;
    }

    &:not(:first-child):not(:last-child) {
      margin: 0 5px;
    }

    &:last-child {
      margin: 0 15px 0 5px;
    }
  }

  .price-tag {
    display: flex;
    margin-top: 5px;

    > p {
      margin: 0px 15px;
      font-size: 14px;
      font-weight: bold;

      &:nth-child(2) {
        opacity: 0.25;
      }
    }
  }

  .flex-one {
    flex: 1;
  }
</style>
