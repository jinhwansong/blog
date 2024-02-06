export interface Post {
  content: string;
  title: string;
  CategoreId:number
}
export interface Categore {
  categore: string
  id: number;
  count: number;
}
export interface ICommon {
  content: string;
  createdAt: string;
  id: number;
  nickName: string;
  title: string;
  src: string;
  Liked:{id:number}[]
}

export interface User {
  email?: string;
  nickName?: string;
  password?: string;
  name?: string;
  profileImage?: string;
  id?:number
}
export interface AxiosResponseError {
  data: string;
  status: number;
  statusText: string;
}
