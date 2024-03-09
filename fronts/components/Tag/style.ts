import styled from "styled-components";

export const TagUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  > li {
    background: ${(props: any) => props.theme.f7f7f7};
    padding: 6px 8px;
    overflow: hidden;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;
