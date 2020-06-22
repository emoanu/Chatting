<template>
  <div class="hello">
    <!-- <router-link v-bind:to="{
            name: 'about',
          }">about</router-link>
<br>
          <router-link v-bind:to="{
            name: 'n',
    }">new page</router-link>-->
    <div v-if="!loggedIn">
      <form @submit.prevent="createUsr">
        <h2>Registration</h2>
        <div
          class="alert alert-success alert-dismissible"
          v-if="regForm.success"
        >
          {{ regForm.success }}
        </div>
        <div class="alert alert-danger alert-dismissible" v-if="regForm.error">
          <i class="material-icons">sentiment_dissatisfied</i>
          {{ regForm.error }}
        </div>
        <input
          type="text"
          class="form-control"
          v-model="regForm.name"
          placeholder="name"
        />
        <input
          type="email"
          class="form-control"
          v-model="regForm.email"
          placeholder="email"
        />
        <input
          type="Password"
          class="form-control"
          v-model="regForm.password"
          placeholder="password"
        />
        <button class="btn btn-primary">
          <i class="material-icons">person_add</i>Register
        </button>
      </form>
      <form @submit.prevent="loginUsr">
        <h2>Login</h2>
        <div class="alert alert-success alert-dismissible" v-if="login.success">
          {{ login.success }}
        </div>
        <div class="alert alert-danger alert-dismissible" v-if="login.error">
          <i class="material-icons">sentiment_dissatisfied</i>
          {{ login.error }}
        </div>
        <input
          type="email"
          class="form-control"
          v-model="login.email"
          placeholder="email"
        />
        <input
          type="Password"
          class="form-control"
          v-model="login.password"
          placeholder="password"
        />
        <button class="btn btn-primary">
          <i class="material-icons">lock</i>Login
        </button>
      </form>
    </div>
    <div v-if="loggedIn">
      <div class="main-body">
        <div class="header">
          <table>
            <tr>
              <td rowspan="2"><i class="zmdi zmdi-arrow-left"></i></td>
              <td rowspan="2">
                <img src="pro.jpeg" alt="profile-pic" />
              </td>
              <td class="name">Anu</td>
              <td rowspan="2" class="right-icons">
                <i class="zmdi zmdi-videocam"></i>
                <i class="zmdi zmdi-phone"></i>
                <i class="zmdi zmdi-more-vert"></i>
              </td>
            </tr>
            <tr>
              <td class="status">online</td>
            </tr>
          </table>
        </div>
        <div class="chats">
          <div v-for="(msg, index) in msgs" :key="index">
            <div
              :class="{
                message: true,
                sent: msg.sender == loggedInUser.id,
                recv: msg.sender != loggedInUser.id,
              }"
            >
              {{ msg.text }}
              <p>
                {{ timeFormat(msg.time) }}<i class="zmdi zmdi-check-all"></i>
              </p>
            </div>
          </div>
        </div>
        <div class="footer">
          <button @click="signOut" class="btn btn-danger">
            <i class="material-icons">exit_to_app</i>SignOut
          </button>
          <div class="input-field">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              id="smiley"
              x="3147"
              y="3209"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z"
                fill="#7d8489"
              />
            </svg>
            <form @submit.prevent="saveMessage">
              <input
                type="text"
                id="msg"
                autocomplete="off"
                oninvalid="this.setCustomValidity('Message cannot be empty')"
                oninput="this.setCustomValidity('')"
                autofocus
                required
                name=""
                placeholder="Type a message"
                v-if="loggedInUser.emailVerified"
                v-model="msg"
              />
              <button
                v-if="!loggedInUser.emailVerified"
                @click.prevent="verifyEmail"
                class="btn btn-outline-secondary"
              >
                <i class="material-icons">email</i>Verify Email
              </button>
            </form>
            <i class="zmdi zmdi-camera"></i>
            <i class="zmdi zmdi-attachment"></i>
          </div>
          <span class="send">
            <i class="zmdi zmdi-mail-send"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  width: 90%;
  margin-left: 5%;
}
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
<style lang="css">
input.form-control {
  width: 90%;
  margin-left: 5%;
}
i.material-icons {
  vertical-align: middle;
}
</style>
<script>
import * as firebase from "firebase";
import firebaseConfig from "@/firebase.config.js";
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
require("firebase/auth");

export default {
  name: "HelloWorld",
  data() {
    return {
      msgs: [],
      msg: null,
      now: null,
      loggedIn: false,
      regForm: {
        name: "Nikky Amresh",
        email: "nikkyamresh8@gmail.com",
        password: "Pass@00#",
        success: null,
        error: null,
      },
      login: {
        email: "nikkyamresh8@gmail.com",
        password: "Pass@00#",
        success: null,
        error: null,
      },
      loggedInUser: {
        name: null,
        email: null,
        profilePic: null,
        id: null,
        emailVerified: null,
      },
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    getMessages() {
      this.msgs = [];
      db.collection("messages")
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
        querySnapshot.docChanges().forEach(() => {
          db.collection("messages")
            .orderBy("time", "desc")
            .limit(50)
            .get()
            .then((data) => {
              this.msgs = [];
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
        });
      });
    },

    print(data) {
      console.log(data);
    },
    saveMessage() {
      var time = new Date().getTime();
      db.collection("messages")
        .add({
          text: this.msg,
          sender: this.loggedInUser.id,
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
    createUsr() {
      var self = this;
      self.regForm.success = self.regForm.error = null;
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          self.regForm.email,
          self.regForm.password
        )
        .then(() => {
          var user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: self.regForm.name,
            })
            .then(() => {
              self.regForm.success = "Account sucsessfully registered.";
              db.collection("users")
                .doc(user.uid)
                .set({
                  name: user.displayName,
                  profilePic: user.photoURL,
                  email: user.email,
                })
                .then((res) => {
                  console.log(res);
                });
              self.checkAuth();
              self.regForm.password = null;
            })
            .catch(function(error) {
              self.checkAuth();
              self.regForm.password = null;
              self.regForm.error = error.message;
            });
        })
        .catch(function(error) {
          self.regForm.error = error.message;
        });
    },
    loginUsr() {
      var self = this;
      self.login.success = self.login.error = null;
      firebase
        .auth()
        .signInWithEmailAndPassword(self.login.email, self.login.password)
        .then(() => {
          self.login.success = "Account sucsessfully LoggedIn.";
          self.login.password = null;
          self.checkAuth();
        })
        .catch(function(error) {
          self.login.error = error.message;
        });
    },
    signOut() {
      var self = this;
      firebase
        .auth()
        .signOut()
        .then(function() {
          self.checkAuth();
          self.login.success = "Account sucsessfully Logged Out.";
        })
        .catch(function(error) {
          self.login.password = error.message;
        });
    },
    checkAuth() {
      var self = this;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          self.loggedIn = true;
          self.loggedInUser.name = user.displayName;
          self.loggedInUser.email = user.email;
          self.loggedInUser.profilePic = user.photoURL;
          self.loggedInUser.id = user.uid;
          self.loggedInUser.emailVerified = user.emailVerified;
          self.getMessages();
        } else {
          self.loggedIn = false;
          self.loggedInUser = {
            name: null,
            email: null,
            profilePic: null,
            id: null,
          };
        }
      });
    },
    verifyEmail() {
      var user = firebase.auth().currentUser;

      user
        .sendEmailVerification()
        .then(function() {
          console.log("sent");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>
