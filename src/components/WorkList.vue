<template>
  <div class="list mt-4 text-center">
    <b-card :title="title" :id="outline">

      <b-list-group v-for="(value, key) in items" :key="key" class="row">
        <b-list-group-item class="text-left p-1">
          {{ value.name }} 
          <b-btn class="p-1 btn" @click="$emit('trigger', key)" v-if="button">{{ button }}</b-btn>
        </b-list-group-item>
      </b-list-group>

    </b-card>
  </div> 
</template>

<script>
import { todo, wip, done } from '@/firebase.js'

export default {
  props: {
    title: String,
    items: Object,
    button: String
  },

  data () {
    return {
      outline: ''
    }
  },

  mounted () {
    if (this.title === 'ToDo') {
      this.outline = 'red'
    } else if (this.title === 'Work In Progress') {
      this.outline = 'yellow'
    } else {
      this.outline = 'green'
    }
  }
}
</script>

<style lang="scss">
  #red {
    border: 1px solid red 
  }

  #yellow {
    border: 1px solid yellow
  }

  #green {
    border: 1px solid green
  }

  .btn {
    float: right;
  }

  .vertical {
    vertical-align: middle //doesn't work
  }
</style>

