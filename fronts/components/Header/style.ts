import styled from "styled-components";

export const HeaderWrap = styled.header`
  border-bottom: 1px solid ${(props: any) => props.theme.ddd};
`;
export const Header = styled.nav`
  width: 100rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6.4rem;
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding:0 2rem;
  }
`;
export const GroupButton = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;
export const Profile = styled.div`
  box-sizing: border-box;
  position: relative;
  > div:first-child {
    display: block;
    overflow: hidden;
    border-radius: 3.8rem;
    width: 3.8rem;
    height: 3.8rem;
    cursor: pointer;
  }

  > div:first-child > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
export const ProfileTap = styled.div`
  position: absolute;
  border-radius: 0.75rem;
  padding: 4px;
  background: ${(props: any) => props.theme.white};
  width: 24rem;
  border: 1px solid ${(props: any) => props.theme.ddd};

  left: 50%;
  top: 5rem;
  transform: translateX(-50%);
  text-align: center;

  &::after {
    position: absolute;
    width: 1rem;
    height: 1rem;
    transform: rotate(45deg);
    left: 0;
    right: 0;
    margin: auto;
    top: -0.6rem;
    background: ${(props: any) => props.theme.white};
    border: 1px solid ${(props: any) => props.theme.ddd};
    content: "";
    border-right: 0;
    border-bottom: 0;
  }
  > a {
    font-size: 1.4rem;
    color: ${(props: any) => props.theme.gery};
    display: block;
    padding: 6px 18px 12px;
  }
  > a:hover {
    color: ${(props: any) => props.theme.blue};
  }
  > a:first-child {
    padding: 12px 18px 6px;
  }
`;