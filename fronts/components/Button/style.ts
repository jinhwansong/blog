import styled from "styled-components";

export const ThemeButton = styled.button`
  width: 12rem;
  height: 5rem;
  border-radius: 3rem;
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
  background: ${(props: any) => props.theme.f7f7f7};
  gap: 0.5rem;
  > p {
    font-size: 1.3rem;
    color: ${(props: any) => props.theme.black};
  }
  > svg {
    font-size: 2rem;
    color: ${(props: any) => props.theme.black};
    transition: transform 0.3s ease-in-out;
  }
  &:hover > svg {
    transform: rotate(360deg);
  }
`;



export const Button = styled.button<{
  $color?: string;
  $width?: string;
  $border?: string;
  $radius?: string;
  $bg?: string;
  $height?: string;
  $font?: string;
  $hoverbg?: string;
  $hovercolor?: string;
}>`
  font-size: ${(props) => {
    switch (props.$font) {
      case "1.2":
        return "1.2rem";
      default:
        return "1.4rem";
    }
  }};
  cursor: pointer;
  outline: 0;
  transition: all 0.3s;
  height: ${(props) => {
    switch (props.$height) {
      case "5":
        return "5rem";
      case "3.5":
        return "3.5rem";
      case "auto":
        return "auto";
      default:
        return "4rem";
    }
  }};

  border-radius: ${(props) => {
    switch (props.$radius) {
      case "100":
        return "100rem";
      case "0":
        return "0";
      case "1":
        return "1rem";
      default:
        return "0.5rem";
    }
  }};

  width: ${(props) => {
    switch (props.$width) {
      case "full":
        return "100%";
      case "50%":
        return "50%";
      case "auto":
        return "auto";
      case "8":
        return "8rem";
      default:
        return "9rem";
    }
  }};
  color: ${(props) => {
    switch (props.$color) {
      case "white":
        return props.theme.white;
      case "fff":
        return props.theme.fff;
      default:
        return props.theme.black;
    }
  }};
  background: ${(props) => {
    switch (props.$bg) {
      case "f7f7f7":
        return props.theme.f7f7f7;
      case "black":
        return props.theme.black;
      case "white":
        return props.theme.white;
      case "blue":
        return props.theme.blue;
      default:
        return "transparent";
    }
  }};
  border: 1px solid
    ${(props) => {
      switch (props.$border) {
        case "ddd":
          return props.theme.ddd;
        case "white":
          return props.theme.white;
        default:
          return "transparent";
      }
    }};
  &:hover {
    background: ${(props) => {
      switch (props.$hoverbg) {
        case "blue":
          return "rgba(51, 102, 255,.95)";
        case "f7f7f7":
          return props.theme.f7f7f7;
        default:
          return "rgba(0,0,0,.7)";
      }
    }};
    color: ${(props) => {
      switch (props.$hovercolor) {
        case "black":
          return props.theme.black;
        case "fff":
          return props.theme.fff;
        default:
          return props.theme.white;
      }
    }};
  }
`;

