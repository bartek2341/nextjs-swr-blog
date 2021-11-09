import styled from "styled-components";

const LoadingIndicator = () => {
  return <Circle />;
};

export default LoadingIndicator;

export const Circle = styled.svg`
  margin: ${({ theme }) => theme.spacing.xs} 0;
  display: inline-block;
  border: 5px solid ${({ theme }) => theme.colors.gold.dark};
  border-right-color: transparent;
  border-radius: 50%;
  animation: rotate 0.75s ease infinite;
  height: 30px;
  width: 30px;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
