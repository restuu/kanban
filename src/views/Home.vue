<template>
  <div id="home" class="row">
    <WorkList class="col-sm-4" title="ToDo"/>
    <work-list class="col-sm-4" title="Work In Progress"/>
    <work-list class="col-sm-4" title="Done"/>
  </div>
</template>

<script>
// @ is an alias to /src
import WorkList from '@/components/WorkList.vue'

export default {
  name: 'home',
  components: {
    WorkList
  },

  data () {
    return {

    }
  }
}
</script>
