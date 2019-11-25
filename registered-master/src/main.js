// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css';
import 'vue-ydui/dist/ydui.base.css';
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import { NavBar } from 'vant';
import { Tabbar, TabbarItem } from 'vux'
import { XHeader } from 'vux'
import { Marquee, MarqueeItem } from 'vux'
import { XInput } from 'vux'
import { Cell } from 'vux'
import { Divider } from 'vux'
import { Search } from 'vux'
import VueResource from 'vue-resource'
import { Loading } from 'vux'
import { NoticeBar } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Icon } from 'vant';
import { XButton } from 'vux'
import { Popup } from 'vant';
import { SwipeCell } from 'vant';
import { Badge } from 'vux'
import { Timeline,TimelineItem} from 'vux'
import { Tag } from 'vant';
import { List } from 'vant';
import { Dialog } from 'vant';
import { Switch } from 'vant';
import { Toast } from 'vant';
import { Field } from 'vant';
import { Uploader } from 'vant';
import { Picker } from 'vant';
import { Actionsheet } from 'vant';

Vue.use(Actionsheet);
Vue.use(Picker);
Vue.use(Uploader);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Switch);
Vue.use(YDUI);
Vue.use(Dialog);
Vue.use(NavBar);
Vue.use(List);
Vue.use(Tag);
Vue.component('timeline', Timeline)
Vue.component('timelineItem', TimelineItem)
Vue.component('badge', Badge)
Vue.use(SwipeCell);
Vue.use(Popup);
Vue.component('x-button', XButton)
Vue.use(Icon);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(NoticeBar);
Vue.component('loading', Loading)
Vue.use(VueResource)
Vue.component('search', Search)
Vue.component('divider', Divider)
Vue.component('cell', Cell)
Vue.component('x-input', XInput)
Vue.component('marquee', Marquee)
Vue.component('marquee-item', MarqueeItem)
Vue.component('x-header', XHeader)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app-box')
