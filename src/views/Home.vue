<template>
  <div id="home">
    
    <b-input-group class="col-sm-4 mx-auto mt-4">
      <b-form-input placeholder="enter your task here" v-model="newTask"/>
      <b-input-group-append>
        <b-btn variant="info" @click="addTask">Add</b-btn>
      </b-input-group-append>
    </b-input-group>

    <div id="worklist" class="row">
      <WorkList 
        class="col-sm-4" 
        title="ToDo" 
        :items="todos" 
        button="Begin"
        @trigger="startTodo"
        />
      <WorkList 
        class="col-sm-4" 
        title="Work In Progress" 
        :items="wip"
        button="Complete"
        @trigger="completeTodo"
        />
      <WorkList 
        class="col-sm-4" 
        title="Done" 
        :items="done"
        />
    </div>

    <!-- {{ todos }} -->

  </div>
</template>

<script>
// @ is an alias to /src
import WorkList from '@/components/WorkList.vue'
import { todo, wip, done } from '@/firebase.js'

export default {
  name: 'home',
  components: {
    WorkList
  },

  data () {
    return {
      newTask: '',
      todos: {},
      wip: {},
      done: {}
    }
  },

  methods: {
    addTask () {
      let todoObj = {
        name: this.newTask,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        startedAt: null,
        isCompleted: false
      }
      todo
        .push(todoObj)
        .then(snapshot => {
          console.log('todo added to database')
        })
    },

    startTodo (key) {
      let self = this
      todo.child(key).once('value')
        .then(snapshot => {
          let toBeStarted = snapshot.val()
          toBeStarted.startedAt = Date.now()
          console.log('---see toBeStarted', toBeStarted)
          todo.child(key).remove()
          wip.child(key).set(toBeStarted)
            .then(err => {
              if (err) {
                console.log('error', err)
              }
              console.log('data moved to wip')
            })
        })
    },

    completeTodo (key) {
      let self = this
      wip.child(key).once('value')
        .then(snapshot => {
          let toBeCompleted = snapshot.val()
          toBeCompleted.completedAt = Date.now()
          console.log('---see toBeCompleted', toBeCompleted)
          wip.child(key).remove()
          done.child(key).set(toBeCompleted)
            .then(err => {
              if (err) {
                console.log('error', err)
              }
              console.log('task completed')
            })
        })
    }
  },

  created () {
    let self = this
    todo.on('value', function (snapshot) {
      self.todos = snapshot.val()
    })
    wip.on('value', function (snapshot) {
      self.wip = snapshot.val()
    })
    done.on('value', function (snapshot) {
      self.done = snapshot.val()
    })
  }
}
</script>
