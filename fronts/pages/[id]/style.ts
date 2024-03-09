import styled from "styled-components";

export const Wrap = styled.section`
  width: 80rem;
`;
export const Title = styled.strong`
  font-size: 4.8rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  font-weight: 800;
  color: ${(props:any) => props.theme.black};
  word-break: keep-all;
  display: block;
`;
export const Other = styled.div`
  
  margin: 2rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  
`;
export const Date = styled.p`
  font-size: 1.6rem;
  > em {
    color: ${(props: any) => props.theme.black};
    font-weight: 500;
  }
`;
export const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;
  > button {
    padding: 0;
  }
  > a {
    color: ${(props: any) => props.theme.blue};
  }
`;
export const WrapTop = styled.div`
  margin-bottom:5rem;
`;
