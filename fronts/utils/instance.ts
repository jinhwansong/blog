import axios from "axios";

export const baseAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  withCredentials: true,
  headers: { "Content-type": "application/json" },
});
export const imageAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  withCredentials: true,
  headers: { "Content-type": "multipart/form-data" },
});

baseAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => {
    const Message = response.data;
    const Status = response.status;
    
    switch (Status) {
      case 201:
        switch (Message) {
          case "사용가능한 아이디입니다.":
            alert(Message);
            return Promise.resolve(Message);
          case "사용가능한 닉네임입니다.":
            alert(Message);
            return Promise.resolve(Message);
          case "닉네임이 변경되었습니다.":
            alert(Message);
            return Promise.resolve(Message);
          case "비밀번호가 일치합니다.":
            alert(Message);
            return Promise.resolve(Message);
          case "비밀번호가 변경되었습니다.":
            alert(Message);
            return Promise.resolve(Message);
          default:
            return response;
        }

      default:
        return response;
    }
  },
  async (error)=>{
    const errorMessage = error.response.data
    const errorStatus = error.response.status;
    switch (errorStatus) {
      case 401:
        switch (errorMessage) {
          case "존재하지 않는 이메일입니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          case "비밀번호가 틀렸습니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          case "로그인이 필요합니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          case "비밀번호가 일치하지 않습니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          default:
            return Promise.reject(error);
        }
      case 403:
        switch (errorMessage) {
          case "이미 사용중인 아이디입니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          case "이미 사용중인 닉네임입니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          case "게시글이 존재하지 않습니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          case "본인게시물이 아닙니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          case "다른 사용자의 글은 수정할 수 없습니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          default:
            return Promise.reject(error);
        }
      case 500:
        switch (errorMessage) {
          case "로그아웃 중 오류가 발생했습니다.":
            alert(errorMessage);
            return Promise.reject(errorMessage);
          default:
            return Promise.reject(error);
        }
      default:
        return Promise.reject(error);
    }
  }
)