import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import './assets/font-awesome/all.css'
import './assets/css/index.scss'

Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'medium', zIndex: 3000});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
