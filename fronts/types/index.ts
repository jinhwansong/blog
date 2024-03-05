export interface Post {
  title: string;
  content: string;
  CategoreId: number;
  keywords: string[];
  image: string[];
}

export interface Modify extends Post {
  id: number;
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
  nickname: string;
  title: string;
  src: string;
  like: number;
  count: number;
  hashtag: string[];
}
export interface ICommons {
  count: number;
  posts: ICommon[];
}
export interface ICommones extends ICommons {
  onPrevPage: () => void;
  onNextPage: () => void;
  onPage: (page: number) => void;
  currentPage:number
}

export interface User {
  email?: string;
  nickName?: string;
  password?: string;
  name?: string;
  image?: string;
  id?:number
}


export interface Hashtag {
  hashtag: string;
  page: number;
}
export interface Search {
  search: string;
  page: number;
}
;

export interface RecentPost {
  id: number;
  title: string;
  view: number;
  src: string;
  content: string;
  Hashtags: string[];
}