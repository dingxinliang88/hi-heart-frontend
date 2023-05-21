//定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/TeamPage.vue";
import User from "../pages/UserPage.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserResultPage from "../pages/UserResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";

const routes = [
  { path: "/", name: "主页", component: Index },
  { path: "/team", name: "队伍", component: Team },
  { path: "/user", name: "用户", component: User },
  { path: "/search", name: "搜索页", component: SearchPage },
  { path: "/user/edit", name: "用户编辑页", component: UserEditPage },
  { path: "/user/list", name: "UserResult", component: UserResultPage },
  { path: "/login", name: "login", component: UserLoginPage },
];

export default routes; //导出
