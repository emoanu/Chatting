<template>
  <div class="hello">
    
    <!-- <router-link v-bind:to="{
            name: 'about',
          }">about</router-link>
<br>
          <router-link v-bind:to="{
            name: 'n',
          }">new page</router-link> -->

          messages :
          <br>
          <div v-for="(msg, index) in msgs" :key="index">
            {{msg.sender}} : {{msg.text}} <br>
            {{timeFormat(msg.time)}}
            <br>
          </div>
          <input type="text" v-model="senderId"> <br>
          <form @submit.prevent="saveMessage">
          <input type="text" v-model="msg">
          <input type="submit" value="submit">
          
          </form>


          
  </div>
</template>

<script>
import db from "@/firebase.config.js";
export default {
  name: 'HelloWorld',
  data(){
    return {
      msgs:[],
      msg :null,
      senderId:null,
      now :null
    }
  },
  created(){
   this.getMessages()
  
  db.collection("messages").onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach( change =>{
      console.log(change.id)
        db.collection("messages").orderBy("time","asc").get().then(data=>{
                this.msgs = []
              data.forEach(msg => {
                var m = {
                  id: msg.id,
                  text : msg.data().text,
                  sender : msg.data().sender,
                  time :msg.data().time
                }
                this.msgs.push(m)
              });
            })
    })

  })

  },
  methods:{
    getMessages(){
      this.msgs =[];
        db.collection("messages").get().then(data=>{
              data.forEach(msg => {
                var m = {
                  id: msg.id,
                  text : msg.data().text,
                  sender :msg.data().sender,
                  time: msg.data().time
                }
                this.msgs.push(m)
              });
            })
    },

    print(data){
      console.log(data)
    },
    saveMessage(){
      var time = new Date().getTime()
      db.collection("messages").add({
        text:this.msg,
        sender : this.senderId,
        time : time
      }).then( this.msg= "" )

    },
    timeFormat(time){
      var t = new Date(time).toLocaleString();
      return t;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
