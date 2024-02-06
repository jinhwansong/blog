import styled from "styled-components";


export const MainList = styled.ul`
  border-radius: 1.5rem;
  > li:hover {
    background: ${(props: any) => props.theme.f7f7f7};
  }
  > li {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 16px;
    cursor: pointer;
  }
`;
export const Image = styled.div<{ $width: string }>`
  width: ${(props: any) => (props.$width === "tap" ? "3.2rem" : "6.4rem")};
  height: ${(props: any) => (props.$width === "tap" ? "3.2rem" : "6.4rem")};
  overflow: hidden;
  border-radius: 1rem;
  > img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    padding: 0;
    max-width: 100%;
  }
`;
export const TapText = styled.div`
    flex:1;
`;
export const TapTitle = styled.em<{ $title: string }>`
  display: block;
  word-break: break-all;
  line-height: 1.4;
  font-weight: ${(props: any) => (props.$title === "tap" ? "400" : "600")};
  color: ${(props: any) =>
    props.$title === "tap" ? props.theme.gery : props.theme.black};
  font-size: ${(props: any) => (props.$title === "tap" ? "1.4rem" : "1.6rem")};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props: any) =>
    props.$title === "tap" ? "2" : "3"};
`;
export const TapDetail = styled.p`
  margin-top: 0.5rem;
  word-break: break-all;
  line-height: 1.4;
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

`;

export const TapSpan = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  line-height: 1;
`;
export const Like = styled.button`
  background: none;
  outline: 0;
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  > svg {
    font-size: 1.6rem;
    color: ${(props: any) => props.theme.red};
    cursor: pointer;
  }
`;
export const Date = styled.p`
  border-right: 1px solid ${(props: any) => props.theme.ddd};
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1;
  margin:0 1rem 0 0.5rem;
  padding-right: 1rem;
`;

