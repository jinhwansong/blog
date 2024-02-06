import React from "react"
import Button from "components/Button";
import * as St from "./style";

interface IInput {
  label?: string;
  type: string;
  placeholder: string;
  id?: string;
  value: string;
  erorr: boolean;
  erorrText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cheack?: string;
  able?: boolean;
  onButton?: () => void;
}

const Input = (props: IInput) => {
  if (props.cheack === "cheack" || props.cheack === "info") {
    return (
      <>
        {props.cheack !== "info" && (
          <St.Label htmlFor={props.id}>{props.label}</St.Label>
        )}

        <St.Cheack>
          <St.Input
            placeholder={props.placeholder}
            type={props.type}
            name={props.id}
            value={props.value}
            onChange={props.onChange}
            $color={props.erorr}
          />
          <Button
            font="1.2"
            width="8"
            height="5"
            type="button"
            disabled={props.able}
            onButton={() => props.onButton()}
            hoverbg={props.able ? "f7f7f7" : "blue"}
            hovercolor={props.able ? "black" : "fff"}
            color={props.able ? "black" : "fff"}
            bg={props.able ? "f7f7f7" : "blue"}
          >
            {props.type === "password" ? "비밀번호 확인":"중복확인"}
          </Button>
        </St.Cheack>
        {props.erorr && <St.Error>{props.erorrText}</St.Error>}
      </>
    );
  }
    return (
      <>
        {props.cheack !== "info" && (
          <St.Label htmlFor={props.id}>{props.label}</St.Label>
        )}

        <St.Input
          placeholder={props.placeholder}
          type={props.type}
          name={props.id}
          value={props.value}
          onChange={props.onChange}
          $color={props.erorr}
        />
        {props.erorr && <St.Error>{props.erorrText}</St.Error>}
      </>
    );
};
export default Input