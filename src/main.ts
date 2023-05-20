import { createApp } from "vue";
import { Button, NavBar, Icon, Tabbar, TabbarItem } from "vant";
import App from "./App.vue";

const app = createApp(App);

app.use(Button).use(NavBar).use(Icon).use(Tabbar).use(TabbarItem);

app.mount("#app");
