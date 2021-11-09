import { useMemo, memo } from "react";
import styled from "styled-components";
import { respondTo } from "@/lib/index";

export const Button = ({ variant, children, onClick, ...props }) => {
  const Component = useMemo(() => {
    switch (variant) {
      case "dark":
        return (
          <DarkButton {...props} onClick={onClick}>
            {children}
          </DarkButton>
        );
      case "secondary":
        return (
          <SecondaryButton {...props} onClick={onClick}>
            {children}
          </SecondaryButton>
        );
      default:
        return (
          <RootButton {...props} onClick={onClick}>
            {children}
          </RootButton>
        );
    }
  }, [variant, children, props, onClick]);
  return Component;
};

export default memo(Button);

const RootButton = styled.button`
  display: inline-block;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  letter-spacing: -0.2px;
  box-shadow: ${({ theme }) => theme.shadows.gold};
  text-shadow: ${({ theme }) => theme.shadows.text};
  background: ${({ theme }) => theme.colors.gold.light};
  border-radius: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  transition: background 0.2s ease, color 0.2s ease;
  border: none;
  padding: 4px 5.5px;
  ${respondTo.sm`
    padding: 6px 7.5px;
    `}
  &:hover:not([disabled]) {
    color: ${({ theme }) => theme.colors.gray.light};
    background: ${({ theme }) => theme.colors.gold.dark};
  }
  &:disabled {
    cursor: default;
    box-shadow: none;
    color: ${({ theme }) => theme.colors.gray.light};
    background: ${({ theme }) => theme.colors.gold.dark};
  }
`;

const DarkButton = styled.button`
  display: inline-block;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  letter-spacing: -0.2px;
  background: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.light};
  transition: background 0.2s ease, color 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.gray.dark};
  padding: 4px 5.5px;
  ${respondTo.sm`
    padding: 6px 7.5px;
    `}
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.gray.dark};
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  padding: 0;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border: none;
  padding: 0;
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.gray.light};
  }
`;
