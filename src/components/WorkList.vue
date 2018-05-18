<template>
  <div class="list mt-4 text-center">
    <b-card :title="title">
      <b-list-group v-for="item in items" :key="item">
        <b-list-item>{{ item }}</b-list-item>
      </b-list-group>
    </b-card>
  </div> 
</template>

<script>
export default {
  props: {
    title: String,
    items: Array
  }
}
</script>
