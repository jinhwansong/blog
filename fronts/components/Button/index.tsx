import React from "react";
import * as St from "./style"


interface IButton {
  color?: string;
  width?: string;
  border?: string;
  children: string;
  bg?: string;
  radius?: string;
  height?: string;
  font?: string;
  onButton?: () => void;
  themes?: string;
  image?: React.JSX.Element;
  disabled?: boolean;
  hoverbg?: string;
  hovercolor?: string;
}


const Button = (props: IButton) => {
    if (props.themes === "themes") {
      return (
        <St.ThemeButton onClick={props.onButton || (() => {})} type="button">
          {props.image} <p>{props.children}</p>
        </St.ThemeButton>
      );
    }
if (props.themes === "disabled") {
 return (
   <St.Button
     $color={props.color}
     $width={props.width}
     $border={props.border}
     $radius={props.radius}
     $bg={props.bg}
     $height={props.height}
     $font={props.font}
     $hoverbg={props.hoverbg}
     $hovercolor={props.hovercolor}
     disabled={props.disabled}
   >
     {props.children}
   </St.Button>
 );
}
      return (
        <St.Button
          onClick={props.onButton || (() => {})}
          type="button"
          $color={props.color}
          $width={props.width}
          $border={props.border}
          $radius={props.radius}
          $bg={props.bg}
          $height={props.height}
          $hoverbg={props.hoverbg}
          $hovercolor={props.hovercolor}
          $font={props.font}
        >
          {props.children}
        </St.Button>
      );
};
export default Button;