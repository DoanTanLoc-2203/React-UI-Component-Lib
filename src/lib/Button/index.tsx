import React from "react";
import {
  dangerColor,
  defaultColor,
  infoColor,
  primaryColor,
  successColor,
  TableColor,
  warningColor,
} from "./color";
import styled from "styled-components";
import {
  BackgroundColor,
  BackgroundColorType,
  Size,
  SizeType,
  Variant,
  VariantType,
} from "./constants";

export interface ButtonProps {
  children?: React.ReactNode;
  size?: Size | string;
  bgColor?: BackgroundColor;
  variant?: Variant;
  onClick?: (value?: any) => void;
}

export interface StyledProps {
  sizeStyled: string;
  schemaStyled: TableColor;
}

const caculateSize = (size: string | undefined) => {
  /* xs, sm, md, lg, or xl */
  if (size === SizeType.XS) return "10px";
  else if (size === SizeType.SM) return "15px";
  else if (size === SizeType.MD) return "20px";
  else if (size === SizeType.LG) return "25px";
  else if (size === SizeType.XL) return "30px";
  else return "10px";
};

const caculateColorScheme = (bgColor: string) => {
  /* default, danger, primary, success , warning, info*/
  if (bgColor === BackgroundColorType.DEFAULT) return defaultColor;
  else if (bgColor === BackgroundColorType.DANGER) return dangerColor;
  else if (bgColor === BackgroundColorType.PRIMARY) return primaryColor;
  else if (bgColor === BackgroundColorType.SUCCESS) return successColor;
  else if (bgColor === BackgroundColorType.INFO) return infoColor;
  else if (bgColor === BackgroundColorType.WARNING) return warningColor;
  else return defaultColor;
};

const schemaColor = (bgColor: string | undefined) => {
  if (bgColor) return caculateColorScheme(bgColor);
  else return defaultColor;
};

const MyButtonSolid = styled.button`
  font-size: ${(props: StyledProps) => props.sizeStyled};
  background: ${(props: StyledProps) => props.schemaStyled.bg};
  color: ${(props: StyledProps) => props.schemaStyled.color};
  border: 1px solid ${(props: StyledProps) => props.schemaStyled.border};
  border-radius: 0.2em;
  transition: 0.4s;
  &:hover {
    background: ${(props: StyledProps) => props.schemaStyled.bgHover};
    border-color: ${(props: StyledProps) => props.schemaStyled.borderHover};
    cursor: pointer;
  }
`;

const MyButtonOutline = styled.button`
  font-size: ${(props: StyledProps) => props.sizeStyled};
  background: none;
  color: ${(props: StyledProps) => props.schemaStyled.border};
  border: 1px solid ${(props: StyledProps) => props.schemaStyled.border};
  border-radius: 0.2em;
  transition: 0.4s;
  &:hover {
    background: ${(props: StyledProps) => props.schemaStyled.bgHover};
    border-color: ${(props: StyledProps) => props.schemaStyled.borderHover};
    color: ${(props: StyledProps) => props.schemaStyled.color};
    cursor: pointer;
  }
`;

const MyButtonGhost = styled(MyButtonOutline)`
  border: none;
  background: none;
  color: ${(props: StyledProps) => props.schemaStyled.border};
  &:hover {
    opacity: 0.7;
  }
`;

const MyButtonLink = styled(MyButtonSolid)`
  // Link
  color: ${(props: StyledProps) => props.schemaStyled.border};
  border: none;
  background: none;
  &:hover {
    text-decoration: underline;
    background: none;
  }
`;

export function Button(props: ButtonProps) {
  const schema = schemaColor(props.bgColor);
  const size = caculateSize(props.size);

  const RenderButtonType = () => {
    if (props.variant === VariantType.SOLID)
      return (
        <MyButtonSolid
          onClick={props.onClick}
          sizeStyled={size}
          schemaStyled={schema}>
          {props.children}
        </MyButtonSolid>
      );
    else if (props.variant === VariantType.OUTLINE)
      return (
        <MyButtonOutline
          onClick={props.onClick}
          sizeStyled={size}
          schemaStyled={schema}>
          {props.children}
        </MyButtonOutline>
      );
    else if (props.variant === VariantType.GHOST)
      return (
        <MyButtonGhost
          onClick={props.onClick}
          sizeStyled={size}
          schemaStyled={schema}>
          {props.children}
        </MyButtonGhost>
      );
    else if (props.variant === VariantType.LINK)
      return (
        <MyButtonLink
          onClick={props.onClick}
          sizeStyled={size}
          schemaStyled={schema}>
          {props.children}
        </MyButtonLink>
      );
    else
      return (
        <MyButtonSolid
          onClick={props.onClick}
          sizeStyled={size}
          schemaStyled={schema}>
          {props.children}
        </MyButtonSolid>
      );
  };
  return <>{RenderButtonType()}</>;
}

Button.defaultProps = {
  size: "xs",
  bgColor: "default",
  variant: "solid",
  onClick: undefined,
};
