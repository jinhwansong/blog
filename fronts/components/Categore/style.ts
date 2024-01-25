import styled from "styled-components";

export const Categore = styled.ul`
    display: flex;
    flex-direction: column;
    gap:0.5rem;
`



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
    width:20rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  > span {
    color: ${(props: any) =>
      props.$color ? props.theme.blue : props.theme.gray};
  }
`;