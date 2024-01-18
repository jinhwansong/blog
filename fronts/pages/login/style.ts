import styled from "styled-components";

export const Form = styled.form`
  justify-content: center;
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  margin-top:3rem;

`