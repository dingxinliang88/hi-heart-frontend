/**
 * 用户类别
 */
export type UserVO = {
  id: number;
  userName: string;
  userAccount: string;
  userAvatar?: string;
  gender: number;
  phone: string;
  email: string;
  userRole: number;
  tags: string[];
  createTime: Date;
};
