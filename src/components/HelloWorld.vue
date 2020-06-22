<template>

<div class="hello container">

    <!-- <router-link v-bind:to="{
            name: 'about',
          }">about</router-link>
<br>
          <router-link v-bind:to="{
            name: 'n',
          }">new page</router-link> -->
          <form class="login" action="">
          <h4>Create an Account</h4>
        
          <label for="username">Enter your Name:</label>
          <input type="text" placeholder=" Enter your name" class="form-control" name="username" id=""><br>
          <br>
          <label for="mail">Enter your Email address:</label>
          <input type="email" placeholder="someone@email.com" class="form-control" name="mail" id=""><br>
          <br>
          <label for="pword">Enter a Password:</label>
          <input type="password" class="form-control" name="pword" id=""><br>
          <br>
          <input type="submit" class="btn btn-primary" value="Submit">
          </form>

          <form class="signIn" action="">
          <h4>Login:</h4>
        
          
          <label for="mail">Enter your Email address:</label>
          <input type="email" placeholder="someone@email.com" class="form-control" name="mail" id=""><br>
          <br>
          <label for="pword">Enter a Password:</label>
          <input type="password" class="form-control" name="pword" id=""><br>
          <br>
          <input type="submit" class="btn btn-primary" value="login">
          </form>

           

<div v-if="loggedIn">
    <h3>WeChat</h3> 
    <br>
    <div id="content" v-for="(msg, index) in msgs" :key="index">
        {{msg.sender}} : {{msg.text}} <br>
        <br>
        {{timeFormat(msg.time)}}
        <br>
    </div>
    <input id="name" type="text" v-model="senderId"> <br>
    <br>
    <div class="sendMsg">
    <form @submit.prevent="saveMessage">
        <input id="txt" type="text" v-model="msg">
        <input id="sent" type="submit" value="send">
        <br>
    </form>
    </div>
    </div>

</div>
</template>

<script>
var gcliendId = "905368348805-osp3kcpr6o0sqj1fjj5229j72tkaatsc.apps.googleusercontent.com";
var gsecrete = "94654jPuNHBIXUWHl85ySWNI";
import db from "@/firebase.config.js";
//import firebase from 'firebase';
export default {
    name: 'HelloWorld',
    data() {
        return {
            gcliendId:gcliendId,
            gsecrete:gsecrete,
            msgs: [],
            msg: null,
            senderId: null,
            now: null,
            loggedIn:true
        }
    },
    created() {

      if(this.loggedIn){
        this.getMessages()

        db.collection("messages").onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                console.log(change.id)
                db.collection("messages").orderBy("time", "asc").get().then(data => {
                    this.msgs = []
                    data.forEach(msg => {
                        var m = {
                            id: msg.id,
                            text: msg.data().text,
                            sender: msg.data().sender,
                            time: msg.data().time
                        }
                        this.msgs.push(m)
                    });
                })
            })

        })
      }
    },
    methods: {
        getMessages() {
            this.msgs = [];
            db.collection("messages").get().then(data => {
                data.forEach(msg => {
                    var m = {
                        id: msg.id,
                        text: msg.data().text,
                        sender: msg.data().sender,
                        time: msg.data().time
                    }
                    this.msgs.push(m)
                });
            })
        },

        print(data) {
            console.log(data)
        },
        saveMessage() {
            var time = new Date().getTime()
            db.collection("messages").add({
                text: this.msg,
                sender: this.senderId,
                time: time
            }).then(this.msg = "")

        },
        timeFormat(time) {
            var t = new Date(time).toLocaleString();
            return t;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
  
  
<style>

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

body {
    background-color: #aad1e7;
}

.hello {
    background-color: #83c1dd;

}

div#content {
    text-align: left;
    border: 1px solid;
    border-radius: 1px 13px 20px;
    margin: 20px;
    width: fit-content;
    border-radius: 1px 15px 15px 15px;
        box-shadow: 1px 2px 2px #7c5e5e;
    background-color: #fff;

}
input#txt {
    width:300px;
    height:30px;
    border-radius:20px;
    font-size:20px;
    background-color:#ff572238;
        width: 200px;

}
input#sent {
    font-size:15px;
    border-radius:10px;
    background-color:#beb;
}
.sendMsg {
    background-color:#ebc897;
    padding:20px;
    padding-top:0px;
    padding-bottom:0px;
    
}
form.login {
    background:#ded;
    text-align:left;
    padding: 30px;

}
h4 {
    text-align:center;
    font-size:20px;
}
form.signIn {
    background-color:#bebe;
    margin:20px;
    padding:20px;
}
</style>
