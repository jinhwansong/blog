import styled from "styled-components";

export const Container = styled.div`
  width: 100rem;
  margin: 0 auto;
  padding: 6rem 0;
  min-height: calc(100vh - 12.6rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 5rem 2rem;
  }
`;
