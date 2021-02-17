<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="newUsername" placeholder="Username" />
    <input type="password" name="password" v-model="newPassword" placeholder="Password" />
    <button type="button" @click="loginUser" >Login</button>
  </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'Login',
        computed: {
            ...mapState(['token'])
        },
        props: {
            username: {
                type: String,
                default: ''
            },
            password: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                newUsername: '',
                newPassword: ''
            }
        },
        mounted: function () {
            this.newUsername = this.username;
            this.newPassword = this.password;
        },
        methods: {
            ...mapActions(['login_user']),

            loginUser: function() {
                const user = JSON.stringify({email: this.newEmail, password: this.newPassword});

                this.login_user(user);

                this.newEmail = '';
                this.newPassword = '';
            }
        }
    }
</script>