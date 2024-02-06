import styled from "styled-components";

export const LoginWrap = styled.div`
  width: 40rem;
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
`;

export const Form = styled.form`
  
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  
  >div{
    width:100%;
  }
`;
export const Title = styled.h3`
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  color: ${(props: any) => props.theme.black};
`;
export const Other = styled.div`
  display: flex;
  font-size:1.4rem;
  font-weight:500;
  gap:1.5rem;

`