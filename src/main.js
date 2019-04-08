import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ApiService from './common/api.service';

import '@/assets/main.scss';
import 'element-ui/lib/theme-chalk/index.css';

/* element-ui lang settings */
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);

Vue.config.productionTip = false;

ApiService.init();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
