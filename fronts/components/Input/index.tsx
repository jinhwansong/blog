import React from "react";
import { Button } from "components";
import * as St from "./style";

interface IInput {
  label?: string;
  type: string;
  placeholder: string;
  id?: string;
  value: string;
  error: boolean; // Corrected typo from "erorr" to "error"
  errorText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  check?: string; // Corrected typo from "cheack" to "check"
  able?: boolean;
  onButton?: () => void;
}

const Input = ({
  label,
  type,
  placeholder,
  id,
  value,
  error,
  errorText,
  onChange,
  check,
  able,
  onButton,
}: IInput) => {
  const handleButtonClick = () => onButton?.();

  return (
    <>
      {check !== "info" && label && <St.Label htmlFor={ id }>{ label }</St.Label>}
      {check === "check" || check === "info" ? (
        <St.Check>
          <St.Input
            placeholder={placeholder}
            type={type}
            name={id}
            value={value}
            onChange={onChange}
            $color={error}
          />
          <Button
            font="1.2"
            width="8"
            height="5"
            type="button"
            disabled={able}
            onButton={handleButtonClick}
            hoverbg={able ? "f7f7f7" : "blue"}
            hovercolor={able ? "black" : "fff"}
            color={able ? "black" : "fff"}
            bg={able ? "f7f7f7" : "blue"}
          >
            {type === "password" ? "비밀번호 확인" : "중복확인"}
          </Button>
        </St.Check>
      ) : (
        <St.Input
          placeholder={placeholder}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          $color={error}
        />
      )}

      {error && <St.Error>{errorText}</St.Error>}
    </>
  );
};

Input.defaultProps = {
  label: "",
  id: "",
  check: "",
  able: true,
  onButton: undefined,
}; 
export default Input;