import styled from "styled-components";

export const Container = styled.form`
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

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props: any) => props.theme.gery};
  margin-bottom: 0.8rem;
`;

export const PasswordText = styled.p`
  font-size: 1.3rem;
  color: ${(props: any) => props.theme.gery};
  line-height: 1.8rem;
  margin-top: 0.8rem;
`;
export const Error = styled.p`
  color: ${(props: any) => props.theme.red};
  line-height: 1;
  font-size: 1.3rem;
  margin-top: 0.8rem;
`;

export const CheckLabel = styled.label<{ $check: boolean }>`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props: any) => props.theme.black};
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  > span {
    border: 1px solid
      ${(props: any) => (props.$check ? props.theme.blue : props.theme.cheack)};
    background: ${(props: any) => (props.$check ? props.theme.blue : "")};
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > span > svg {
    width: 0.8rem;
    height: 0.8rem;
    color: ${(props: any) => props.theme.fff};
  }
`;
export const CheckboxUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${(props: any) => props.theme.ddd};
`;
export const CheckLabels = styled(CheckLabel)`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props: any) => props.theme.gery};
`;
export const Checkbox = styled.input`
  display: none;
`;
export const InputWrap = styled.div``;
export const TermWrap = styled.div``;
