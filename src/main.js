import {
    createApp
} from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import Report from "19-Rollup"
import Loading from "19-Rollup/src/components/loading/index"
import flyBox from "19-Rollup/src/components/flyBox/index"
import ScreenContainer from "19-Rollup/src/components/container/index"
import DrawLogo from "19-Rollup/src/components/logo/index"
import VueCountTo from "19-Rollup/src/components/countTo/index"
import QaCharts from "19-Rollup/src/components/vueChart/index"
import BaseScrollList from "19-Rollup/src/components/baseScrollList/index"





createApp(App).use(router).use(store).use(Report).use(DrawLogo).use(flyBox).use(Loading).use(ScreenContainer)
    .use(VueCountTo)
    .use(QaCharts)
    .use(BaseScrollList)
    .mount('#app')