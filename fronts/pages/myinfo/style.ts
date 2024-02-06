import styled from "styled-components";

export const MyInfo = styled.section`
    width:80rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:3rem;
`
export const MyInfoImg = styled.article``;
export const MyInfoSec = styled.article`
  border: 1px solid ${(props: any) => props.theme.ddd};
  padding:3rem 3rem;
  border-radius: 1rem;
  width:100%;
`;
export const MyInfoTit = styled.strong`
    font-size:2rem;
    font-weight:600;
    color:${(props:any)=>props.theme.black};
    line-height:1;
`;
export const MyInfop = styled.p`
  font-size: 1.6rem;
  color: ${(props: any) => props.theme.gery};
  line-height: 1;
  margin: 1.5rem 0 3.5rem;
`;
export const MyInfoList = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props: any) => props.theme.ddd};
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  > p {
    min-width: 12rem;
    margin-right: 1.5rem;
    color: ${(props: any) => props.theme.black};
  }
  > span {
    flex: 1 1 0%;
    margin-right: 15px;
    word-break: break-all;
    color: ${(props: any) => props.theme.gery};
  }
  > svg {
    color: ${(props: any) => props.theme.black};
    font-size: 2rem;
  }
  > em {
    color: ${(props: any) => props.theme.red};
  }
`;
export const MyInfoLists = styled(MyInfoList)`
  cursor: pointer;
`;
