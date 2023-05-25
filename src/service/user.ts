import myAxios from "../plugins/myAxios";

export const getLoginUser = async () => {
  const res = await myAxios.get("/user/current");

  if (res.code === 0 && res.data) {
    // console.log("@@@", res.data);
    return res.data;
  }
  return null;
};
