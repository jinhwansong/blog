import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  width: 100%;
  flex: 1;
  gap: 2rem;
  > div {
    flex: 1;
  }
  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

export const Contener = styled.section`
  border: 1px solid ${(props: any) => props.theme.ddd};
  background: ${(props: any) => props.theme.blacks};
  border-radius: 1rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 90rem;
  @media screen and (max-width: 1024px) {
    min-height: 50rem;
  }
`;
