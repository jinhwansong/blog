import styled from "styled-components";


export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props: any) => props.theme.gery};
  margin-bottom: 0.8rem;
`;
export const Input = styled.input<{ $color: boolean }>`
  width: 100%;
  height: 4.8rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  color: ${(props: any) => props.theme.black};
  border: 1px solid
    ${(props: any) => (props.$color ? props.theme.red : props.theme.ddd)};
  padding: 0px 1.5rem;
  font-size: 1.4rem;
  outline: 0;
  background: ${(props: any) => props.theme.input};
  &:focus {
    border: 1px solid
      ${(props: any) => (props.$color ? props.theme.red : props.theme.blue)};
  }
`;
export const Error = styled.p`
  color: ${(props: any) => props.theme.red};
  line-height: 1;
  font-size: 1.3rem;
  margin-top: 0.8rem;
`;


