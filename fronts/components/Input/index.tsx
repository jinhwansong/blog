import React from "react"
import * as St from "./style";

interface IInput {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  value: string;
  erorr: boolean;
  erorrText:string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IInput) => {
  return (
    <>
      <St.Label htmlFor={props.id}>{props.label}</St.Label>
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