import React from "react";
import * as St from "./style";

interface IButton {
  color?: string;
  width?: string;
  border?: string;
  children?: string | number;
  bg?: string;
  radius?: string;
  height?: string;
  font?: string;
  onButton?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  themes?: string;
  image?: React.ReactNode; // Corrected type for image
  disabled?: boolean;
  hoverbg?: string;
  hovercolor?: string;
  type?: "button" | "submit";
}

const Button = ({
  color,
  width,
  border,
  children,
  bg,
  radius,
  height,
  font,
  onButton,
  themes,
  image,
  disabled,
  hoverbg,
  hovercolor,
  type = "button", // Set default type
}: IButton) => {
  // Destructuring props for clarity
  if (themes === "themes") {
    return (
      <St.ThemeButton onClick={onButton || (() => {})} type={type}>
        {image} <p>{children}</p>
      </St.ThemeButton>
    );
  }
  if (themes === "arr") {
    return (
      <St.Button
        onClick={onButton || (() => {})}
        type={type}
        $color={color}
        $width={width}
        $border={border}
        $radius={radius}
        $bg={bg}
        $height={height}
        $fonts={font}
        $hoverbg={hoverbg}
        $hovercolor={hovercolor}
        disabled={disabled}
      >
        {image}
      </St.Button>
    );
  }

  return (
    <St.Button
      onClick={onButton || (() => {})}
      type={type}
      $color={color}
      $width={width}
      $border={border}
      $radius={radius}
      $bg={bg}
      $height={height}
      $hoverbg={hoverbg}
      $hovercolor={hovercolor}
      $fonts={font}
      disabled={disabled}
    >
      {children}
    </St.Button>
  );
};

export default Button;
