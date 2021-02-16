<template>
    <div class="register">
        <b-container fluid>
            <b-form>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newFirstName" class="mb-2 mr-sm-2 mb-sm-0" placeholder="First Name"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newLastName" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Last Name"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newUsername" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Username"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newPassword" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Password"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-input v-model="newEmail" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Email"></b-input>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col sm="3" offset="2">
                        <b-button variant="primary" size="lg" @click="addNew">SignUp</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>
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
                                                    email: this.email});

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