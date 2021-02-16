import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
  },
  actions: {
    new_user: function({ commit }, user) {
      fetch('http://localhost:8000/api/users/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      }).then((response) => {
        if (!response.ok) {
          console.log(response)
          throw response;
        }
        return 'success'
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    login_user: function({ commit }, user){
      fetch('http://localhost:8762/rest-airport-user-service/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        this.state.token = response.headers.get("Authorization");
        console.log(this.state.token);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert("Bad Credentials");
          });
        else
          alert(error);
      });
    },
  },
  modules: {
  }
})
