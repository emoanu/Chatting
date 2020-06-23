<template>
<div class="hello container">
    <!-- <router-link v-bind:to="{
            name: 'about',
          }">about</router-link>
<br>
          <router-link v-bind:to="{
            name: 'n',
          }">new page</router-link> -->
<div class="alert alert-danger alert-dismissible fade show" v-if="errorMsg">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <p>
        {{ errorMsg }}
      </p>
    </div>
    <div
      class="alert alert-success alert-dismissible fade show"
      v-if="successMsg"
    >
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <p>
        {{ successMsg }}
      </p>
    </div>
    <div v-if="!loggedIn">
      <form @submit.prevent="createUser" class="login create" action="">
        <h4>Create an Account</h4>
        <label for="username">Enter your Name:</label>
        <input
          type="text"
          placeholder=" Enter your name"
          class="form-control"
          name="username"
          v-model="regForm.name"
        />
        <label for="mail">Enter your Email address:</label>
        <input
          type="email"
          placeholder="someone@email.com"
          class="form-control"
          name="mail"
          v-model="regForm.email"
        />
        <label for="pword">Enter a Password:</label>
        <input
          type="password"
          v-model="regForm.password"
          class="form-control"
          name="pword"
        /><br />
        <button class="btn btn-outline-secondary">
          <i class="material-icons">person_add</i> Create Account
        </button>
        <button @click.prevent="showLogin" class="btn btn-outline-primary">
          <i class="material-icons">lock</i> Login
        </button>
      </form>

      <form @submit.prevent="loginUser" class="login signIn" action="">
        <h4>Login</h4>

        <label for="mail">Enter your Email address:</label>
        <input
          type="email"
          placeholder="someone@email.com"
          class="form-control"
          name="mail"
          v-model="loginForm.email"
        />
        <label for="pword">Enter a Password:</label>
        <input
          type="password"
          placeholder="Password"
          class="form-control"
          name="pword"
          v-model="loginForm.password"
        /><br />
        <button class="btn btn-outline-secondary">
          <i class="material-icons">lock</i> Login
        </button>
        <button @click.prevent="showReg" class="btn btn-outline-primary">
          <i class="material-icons">person_add</i> SignUp
        </button>
      </form>
    </div>

    <div v-if="loggedIn">
      {{ loginUserData.name }}
      <button @click="signOut" class="btn btn-outline-danger">
        <i class="material-icons">exit_to_app</i> SignOut
      </button>
      <h3>WeChat</h3>
      <br />
      <div class="texts">
        <div v-for="(msg, index) in msgs" :key="index">
          <div
            :class="{
              message: true,
              sent: msg.sender == loginUserData.id,
            }"
          >
            {{ msg.text }} <br />
            <br />
            {{ timeFormat(msg.time) }}
            <br />
          </div>
        </div>
      </div>
      <br />
      <button class="emoji-btn">
        <i @click.prevent="showHideEmoji" class="material-icons"
          >sentiment_satisfied_alt</i
        >
      </button>

      <div class="emoji-btns">
        <li
          @click="writeEmoji($event)"
          v-for="(emoji, index) in emojis"
          :key="index"
        >
          {{ emoji }}
        </li>
      </div>
      <form class="sendMsg" @submit.prevent="sendMessage">
        <input
          placeholder="Type Something..."
          id="txt"
          type="text"
          autocomplete="off"
          v-model="msg"
        />
        <br />
      </form>
    </div>
  </div>
</template>

<script>
var gcliendId =
  "905368348805-osp3kcpr6o0sqj1fjj5229j72tkaatsc.apps.googleusercontent.com";
var gsecrete = "94654jPuNHBIXUWHl85ySWNI";
import db from "@/firebase.config.js";
import firebase from "firebase";
const emojis = require("emojis-list");

//import firebase from 'firebase';
export default {
  name: "HelloWorld",
  data() {
    return {
      gcliendId: gcliendId,
      gsecrete: gsecrete,
      msgs: [],
      msg: null,
      emojis: emojis,
      now: null,
      successMsg: null,
      errorMsg: null,
      loggedIn: false,
      loginForm: {
        email: null,
        password: null,
      },
      regForm: {
        name: null,
        email: null,
        password: null,
      },
      loginUserData: {
        name: null,
        email: null,
        id: null,
      },
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    getMessages() {
      db.collection("messages")
        .orderBy("time", "desc")
        .limit(30)
        .get()
        .then((data) => {
          data.forEach((msg) => {
            var m = {
              id: msg.id,
              text: msg.data().text,
              sender: msg.data().sender,
              time: msg.data().time,
            };
            this.msgs.push(m);
          });
          this.msgs.reverse();
        });
      db.collection("messages").onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().every((change) => {
          if (change.type === "added") {
            var m = {
              id: change.doc.id,
              text: change.doc.data().text,
              sender: change.doc.data().sender,
              time: change.doc.data().time,
            };
            this.msgs.push(m);
            window.scrollTo(0,document.querySelector('div.texts').scrollHeight);
            return false;
          }
        });
      });
      //   db.collection("messages").onSnapshot((querySnapshot) => {
      //   querySnapshot.docChanges().forEach(() => {
      //     db.collection("messages")
      //       .orderBy("time", "desc")
      //       .limit(1)
      //       .get()
      //       .then((data) => {
      //         data.forEach((msg) => {
      //           var m = {
      //             id: msg.id,
      //             text: msg.data().text,
      //             sender: msg.data().sender,
      //             time: msg.data().time,
      //           };
      //           this.msgs.push(m);
      //         });
      //   });
      //     });
      //   });
    },

    print(data) {
      console.log(data);
    },
    sendMessage() {
      var time = new Date().getTime();
      db.collection("messages")
        .add({
          text: this.msg,
          sender: this.loginUserData.id,
          time: time,
        })
        .then((this.msg = ""));
    },
    timeFormat(time) {
      var d = new Date(time);
      var h = d.getHours();
      var m = d.getMinutes();
      var ampm = "";
      if (h > 12 && h != 0) {
        h -= 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }
      return h + ":" + m + " " + ampm;
    },
    showReg() {
      document.querySelector(".create").style.display = "block";
      document.querySelector(".signIn").style.display = "none";
    },
    showLogin() {
      document.querySelector(".create").style.display = "none";
      document.querySelector(".signIn").style.display = "block";
    },
    loginUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(() => {
          this.successMsg = "Logged in Successfully!";
          this.checkAuth();
          (this.loginForm.password = null), (this.loggedIn = true);
        })
        .catch((error) => {
          this.errorMsg = error.message;
        });
    },
    createUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.regForm.email,
          this.regForm.password
        )
        .then(() => {
          this.successMsg = "Account has been successfully created.";
          this.checkAuth();
          this.setName(this.regForm.name);
          this.regForm.password = null;
        })
        .catch((error) => {
          this.errorMsg = error.message;
        });
    },
    checkAuth() {
      var self = this;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var userProfile = firebase.auth().currentUser;
          self.loginUserData.name = userProfile.displayName;
          self.loginUserData.id = userProfile.uid;
          self.loginUserData.email = userProfile.email;
          self.getMessages();
          self.loggedIn = true;
        } else {
          self.loggedIn = false;
          self.loginUserData.name = null;
          self.loginUserData.id = null;
          self.loginUserData.email = null;
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.successMsg = "Successfully logout";
          this.checkAuth();
        })
        .catch((error) => {
          this.errorMsg = error.message;
          this.checkAuth();
        });
    },
    setName(n) {
      var self = this;
      var user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: n,
        })
        .then(() => {
          self.loginUserData.name = n;
          self.successMsg = "Name successfully saved!";
        })
        .catch((err) => {
          self.errorMsg = err.message;
        });
    },
    showHideEmoji() {
      var emojiBox = document.querySelector(".emoji-btns");
      if (emojiBox.style.display == "block" || emojiBox.style.display == "") {
        emojiBox.style.display = "none";
      } else {
        emojiBox.style.display = "block";
      }
    },
    writeEmoji(e) {
      document.getElementById("txt").value += e.target.innerHTML ;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
