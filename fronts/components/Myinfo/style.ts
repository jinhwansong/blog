import styled from "styled-components";

export const MyInfoPopup = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Popup = styled.div`
  width: 100%;
  max-width: 44rem;
  min-height: 20rem;
  border-radius: 1rem;
  background: ${(props: any) => props.theme.white};
`;
export const PopupTitle = styled.p`
  height: 8rem;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px;
  > span,
  svg {
    min-width: 6rem;
    text-align: right;
    font-size: 3rem;
    cursor: pointer;
  }
`;
export const PopupCon = styled.form`
  padding: 0px 25px 30px;
`;
export const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Button = styled.div`
  margin-top:2rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`