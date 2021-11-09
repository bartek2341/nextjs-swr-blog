import styled from "styled-components";

const PageTitle = ({ children }) => {
  return <H4>{children}</H4>;
};

export default PageTitle;

const H4 = styled.h4`
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
