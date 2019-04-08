import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_BASE_URL, AUTH_TOKEN } from '@/common/config';

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_BASE_URL;
    Vue.axios.defaults.headers.common['x-auth-token'] = AUTH_TOKEN;
  },

  query(resource, params) {
    return Vue.axios.get(resource, { params }).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get(resource, slug = '') {
    return Vue.axios.get(`${resource}?${slug}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  delete(resource, slug) {
    return Vue.axios.delete(`${resource}/${slug}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;
