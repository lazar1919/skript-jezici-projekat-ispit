<template>
  <div id="register">
    <h1>Registration</h1>
    <input type="text" name="newFirstName" v-model="newFirstName" placeholder="First Name" />
    <input type="text" name="newLastName" v-model="newLastName" placeholder="Last Name" />
    <input type="text" name="newUsername" v-model="newUsername" placeholder="username" />
    <input type="password" name="newPassword" v-model="newPassword" placeholder="Password" />
    <input type="text" name="newEmail" v-model="newEmail" placeholder="email" />
    <button type="button"  @click="addNew">Register</button>
  </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: 'Register',
        computed: {
            
        },
        props: {
            firstName: {
                type: String,
                default: ''
            },
            lastName: {
                type: String,
                default: ''
            },
            username: {
                type: String,
                default: ''
            },
            password: {
                type: String,
                default: ''
            },
            email: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                newFirstName: '',
                newLastName: '',
                newUsername: '',
                newPassword: '',
                newEmail: ''
            }
        },
        mounted: function () {
            this.newFirstName = this.firstName;
            this.newLastName = this.lastName;
            this.newUsername = this.username;
            this.newPassword = this.password;
            this.newEmail = this.email;
        },
        methods: {
            ...mapActions(['new_user']),

            addNew: function() {
                const user = JSON.stringify({firstName: this.newFirstName, lastName: this.newLastName,
                                                    username: this.newUsername, password: this.newPassword,
                                                    email: this.newEmail});

                this.new_user(user);

                this.newFirstName = '';
                this.newLastName = '';
                this.newUsername = '';
                this.newPassword = '';
                this.newEmail = '';
            }
        }
    }
</script>