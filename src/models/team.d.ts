import { UserVO } from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
  id: number;
  teamName: string;
  description: string;
  maxNum: number;
  teamPassword?: string;
  teamAvatar: string;
  status: number;
  createUserId: number;
  leaderId: number;
  createTime: Date;
  leader: UserVO;
  joinNum?: number;
};
