import styled from "styled-components";


export const Main = styled.main`
  display: flex;
  width: 100%;
  flex: 1;
  gap: 2rem;
`;
export const Aside = styled.aside`
  width: 32rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  > div {
    border: 1px solid ${(props: any) => props.theme.ddd};
    background: ${(props: any) => props.theme.blacks};
    border-radius: 1rem;
    padding: 3rem;
  }
`;
export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props: any) => props.theme.black};
  display: flex;
  align-items: center;
  gap: 10px;
  
  > svg {
    font-size: 2rem;
    /* transform: rotateY(-180deg); */
  }
`;
export const Input = styled.input`
  margin: 1.5rem 0 1.2rem;
  width: 100%;
  height: 4.5rem;
  border-radius: 0.5rem;
  color: ${(props: any) => props.theme.black};
  border: 1px solid ${(props: any) => props.theme.ddd};
  padding: 0px 1.5rem;
  font-size: 1.4rem;
  background: ${(props: any) => props.theme.input};
  outline: 0;
  &:focus {
    border: 1px solid ${(props: any) => props.theme.blue};
  }
`;
export const ButtonWrap = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
`;
export const Tag = styled.div`
  border-top: 1px solid ${(props: any) => props.theme.ddd};
  padding-top:1.5rem;
  margin-top:2rem;
`;
export const TagUl = styled.ul`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  > li {
    background: ${(props: any) => props.theme.f7f7f7};
    padding:5px 8px;
  }
  > li a{
    display: block;
    width:100%;
  }
`;

;
export const Contener = styled.section`
  flex: 1;
  border: 1px solid ${(props: any) => props.theme.ddd};
  background: ${(props: any) => props.theme.blacks};
  border-radius: 1rem;
  padding: 3rem;
`;
