import styled from "styled-components";

export const SubMenuContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
  width: 60px;
  /* min-width: 36px; */
  background: linear-gradient(91.04deg, #222929 17.29%, rgba(34, 41, 41, 0.3) 93.97%);
  /* border-radius: ${({ theme }) => theme.radii.default}; */
  /* border: ${({ theme }) => `1px solid ${theme.colors.primary}`}; */
  transform: translate(-8px, 100px) !important;
  margin-top: -68px;
  margin-right: -5px;
  border-radius: 5px;
  z-index: 1000;
`;

export const ClickableElementContainer = styled.div`
  cursor: pointer;
`;

export const SubMenuItem = styled.button`
  border: 0;
  outline: 0;
  cursor: pointer;
  background: transparent;
  padding: 5px;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  font-size: 12px;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;
