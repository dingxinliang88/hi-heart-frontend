//定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/Team/TeamPage.vue";
import TeamAddPage from "../pages/Team/TeamAddPage.vue";
import TeamEditPage from "../pages/Team/TeamEditPage.vue";
import User from "../pages/User/UserPage.vue";
import SearchIndex from "../pages/search/SearchIndex.vue";
import UserSearchPage from "../pages/search/UserSearchPage.vue";
import TeamSearchPage from "../pages/search/TeamSearchPage.vue";
import UserEditPage from "../pages/User/UserEditPage.vue";
import UserResultPage from "../pages/User/UserResultPage.vue";
import UserLoginPage from "../pages/User/UserLoginPage.vue";

const routes = [
  { path: "/", name: "主页", component: Index },
  { path: "/team", name: "队伍", component: Team },
  { path: "/team/add", name: "创建队伍", component: TeamAddPage },
  { path: "/team/edit", name: "修改队伍信息", component: TeamEditPage },
  { path: "/user", name: "用户", component: User },
  { path: "/search", name: "搜索页", component: SearchIndex },
  { path: "/search/user", name: "用户搜索页", component: UserSearchPage },
  { path: "/search/team", name: "队伍搜索页", component: TeamSearchPage },
  { path: "/user/edit", name: "用户编辑页", component: UserEditPage },
  { path: "/user/list", name: "UserResult", component: UserResultPage },
  { path: "/login", name: "login", component: UserLoginPage },
];

export default routes; //导出
