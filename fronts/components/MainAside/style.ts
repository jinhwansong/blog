import styled from "styled-components";

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
  @media screen and (max-width: 1024px) {
    width: 100%;
    
  }
`;
export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props: any) => props.theme.black};
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
  > svg {
    font-size: 2rem;
    /* transform: rotateY(-180deg); */
  }
`;
export const Input = styled.input`
  margin-bottom: 1.2rem;
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
  padding-top: 1.5rem;
  margin-top: 2rem;
`;

export const TapWrap = styled.ul`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0 1.2rem;
`;



export const Categore = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CategoreLi = styled.li<{ $color: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  > p {
    color: ${(props: any) =>
      props.$color ? props.theme.blue : props.theme.black};
    font-weight: 500;
    width: 20rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  > span {
    color: ${(props: any) =>
      props.$color ? props.theme.blue : props.theme.gray};
  }
`;