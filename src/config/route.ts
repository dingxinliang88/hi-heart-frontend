//定义一些路由
import Index from "../pages/Index.vue";
import Team from "../pages/Team/TeamPage.vue";
import TeamAddPage from "../pages/Team/TeamAddPage.vue";
import TeamEditPage from "../pages/Team/TeamEditPage.vue";
import TeamTransferPage from "../pages/Team/TeamTransferPage.vue";
import TeamJoinUsersPage from "../pages/Team/TeamJoinUsersPage.vue";
import User from "../pages/User/UserPage.vue";
import SearchIndex from "../pages/search/SearchIndex.vue";
import UserSearchPage from "../pages/search/UserSearchPage.vue";
import TeamSearchPage from "../pages/search/TeamSearchPage.vue";
import SearchMyTeamPage from "../pages/search/SearchMyTeamPage.vue";
import UserEditPage from "../pages/User/UserEditPage.vue";
import UserResultPage from "../pages/User/UserResultPage.vue";
import UserLoginPage from "../pages/User/UserLoginPage.vue";
import UserRegisterPage from "../pages/User/UserRegisterPage.vue";
import OptionsIndexVue from "../pages/options/OptionsIndex.vue";
import TagSelect from "../pages/tags/TagSelect.vue";

const routes = [
  { path: "/", name: "主页", component: Index },
  { path: "/team", name: "队伍", component: Team },
  { path: "/team/add", name: "创建队伍", component: TeamAddPage },
  { path: "/team/edit", name: "修改队伍信息", component: TeamEditPage },
  { path: "/team/transfer", name: "转让队伍", component: TeamTransferPage },
  { path: "/team/join", name: "队伍信息页", component: TeamJoinUsersPage },
  { path: "/user", name: "用户", component: User },
  { path: "/search", name: "搜索页", component: SearchIndex },
  { path: "/search/user", name: "用户搜索页", component: UserSearchPage },
  { path: "/search/team", name: "队伍搜索页", component: TeamSearchPage },
  {
    path: "/search/my/team",
    name: "搜索我的队伍页",
    component: SearchMyTeamPage,
  },
  { path: "/user/edit", name: "用户编辑页", component: UserEditPage },
  { path: "/user/list", name: "UserResult", component: UserResultPage },
  { path: "/login", component: UserLoginPage },
  { path: "/register", component: UserRegisterPage },
  { path: "/opt", name: "寻心", component: OptionsIndexVue },
  { path: "/tag/select", name: "标签选择", component: TagSelect },
];

export default routes; //导出
