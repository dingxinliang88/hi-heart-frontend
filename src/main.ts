import { createApp } from "vue";
import App from "./App.vue";
import routes from "./config/route";
import * as VueRouter from "vue-router";
// import { Button, NavBar, Icon, Tabbar, TabbarItem } from "vant";
import Vant from "vant";
import "vant/lib/index.css";

const app = createApp(App);

// app.use(Button).use(NavBar).use(Icon).use(Tabbar).use(TabbarItem);
app.use(Vant);

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
});


app.use(router);

app.mount("#app");
