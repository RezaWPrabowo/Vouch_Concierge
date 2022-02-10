<template>
  <div id="app">
    <div v-if="loading">
    </div>

    <div v-else>
      <div class="mobile">
        <Header
          :active="active_index"
          :menus="home_menu"
          @tab-click="set_active"
        />
        
        <Body
          :menus="home_menu"
          @menu-click="toggle_modal"
        />

        <Modal
          :show="modal"
          :data="selected_menu"
          @close="modal = !modal"
        />
      </div>

      <div class="desktop">
        <strong>
          <p>This is just a prototype mobile version</p>
          <p>There are no display after 768px</p>
          <p>Please resize your window width to at least 767px</p>
        </strong>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'

import { Home, Detail, MenuItem } from '@/types/models'

import Header from '@/components/Header.vue'
import Body from '@/components/Body.vue'
import Modal from '@/components/Modal.vue'

const _ = require('lodash')

const xios_api = axios.create({
  responseType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
})

@Component({
  components: {
    Header,
    Body,
    Modal
  },
})
export default class App extends Vue {
  home_menu: Home[] = []
  detail_menu: Detail[] = []

  window_width: number = window.innerWidth
  loading: boolean = true
  modal: boolean = false
  active_index: number  = 0

  selected_menu: MenuItem = null

  async created() {
    this.detail_menu = await this.fetch_detail()
    this.home_menu = await this.fetch_home()

    this.$nextTick(() => {
      this.loading = false
    })
  }

  async mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize() {
    this.window_width = window.innerWidth
  }

  async fetch_detail() {
    const response = await xios_api.get('ios/catalogue/detail')

    console.log(response.data)
    
    return response.data;
  }

  async fetch_home() {
    const response = await xios_api.get('ios/catalogue/home')

    const data = _.map(response.data.categories, (item: any) => {
      return _.merge(item, _.find(response.data.list, { category_id: item._id }));
    })
    
    return data;
  }

  toggle_modal(item: MenuItem) {
    this.selected_menu = item
    this.modal = true

    console.log(item)
  }

  set_active(index) {
    this.active_index = index
    window.scrollBy(0, -90)
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px) {
    .desktop {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }

    .mobile {
      display: none;
    }
  }

  @media screen and (max-width: 767px) {
    .desktop {
      display: none;
    }

    .mobile {
      margin-bottom: 30%;
    }
  }
</style>
