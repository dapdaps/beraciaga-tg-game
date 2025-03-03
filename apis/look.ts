import { get, post } from "@/utils/http";

export interface LookItem {
  category: string;
  level: number;
  look_id: string;
}

export interface UserLookItem extends LookItem {
  use: boolean;
}

export interface LookResponse {
  code: number;
  data: LookItem[];
}

export interface UserLookResponse {
  code: number;
  data: UserLookItem[];
}

export interface UseLookResponseItem {
  success: boolean;
}

export interface UseLookResponse {
  code: number;
  data: UseLookResponseItem[];
}

export const getLookList = (params: any) =>
  get("/api/look/list", {
    category: params,
  });

export const startLook = (params: any) =>
  post(`/api/look/start?category=${params}`);

export const useLook = ({
  look_ids,
  tg_user_id,
}: {
  look_ids: string[];
  tg_user_id: string;
}): Promise<UseLookResponse> =>
  post(`/api/look/use`, {
    look_ids,
    tg_user_id,
  });

export const getUserLookList = ({
  tg_user_id,
  use,
}: {
  tg_user_id: string;
  use?: boolean;
}): Promise<UserLookResponse> =>
  get("/api/look/user", {
    tg_user_id,
    use,
  });
