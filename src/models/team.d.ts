import { UserVO } from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
  teamId: number;
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
  joinNum: number;
  hasJoin: boolean;
};

export type Team = {
  id: number;
  teamName: string;
  description: string;
  maxNum: number;
  teamPassword?: string;
  teamAvatar: string;
  status: number;
};
