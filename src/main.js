window.$ = window.jQuery = require('jquery');
window.moment = require('moment');
window.luxon = require('luxon');
import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
// import Datetime from "vue-datetime";
import AXIOS from './http'
import ReadMore from 'vue-read-more';


import './registerServiceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/custom.css'
import VueSweetalert2 from 'vue-sweetalert2';
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import * as VueGoogleMaps from 'vue2-google-maps'
import VeeValidate from 'vee-validate';
// import Vuetify from 'vuetify'


Vue.use(ReadMore);
Vue.use(VeeValidate);
// Vue.use(Vuetify);

Vue.component("vuetable-pagination",VuetablePagination,{
  wrapperClass: 'pagination b-pagination pagination-md',
  activeClass: 'active large',
  disabledClass: 'disabled',
  pageClass: 'item',
  linkClass: 'icon item',
  paginationClass: 'ui bottom attached segment grid',
  paginationInfoClass: 'left floated left aligned six wide column',
  dropdownClass: 'ui search dropdown',
  icons: {
    first: 'angle double left icon',
    prev: 'left chevron icon',
    next: 'right chevron icon',
    last: 'angle double right icon',
  }
})
// import VeeValidate from 'vee-validate';

// Vue.use(VeeValidate);
Vue.use(VueSweetalert2);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBN0BOLCuTPd6_kaYIFY1CHSa1HhDOafc4',
    libraries: 'places',
    v: '3.26'
    },
  })

// import 'vue-datetime/dist/vue-datetime.css'
Object.defineProperties(Vue.prototype, {

  axios: {
    get() {
      return AXIOS
    }
  },

  $http: {
    get() {
      return AXIOS
    }
  }

})

Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Vue.use(Datetime)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
