import styled from 'styled-components'
import { Flex, ButtonMenuItem } from '@onidex-libs/uikit';

export const OrderTypesWrapper = styled(Flex)`
  background-color: ${({theme}) => theme.isDark ? '#171717' : 'fff'};
  padding: 8px 16px;
  border-radius: 15px 15px 0 0;
  div {
    height: 32px;
    border-radius: 0px;
    background: transparent;
    border: none;
    width: 100%;
  }
`;

export const TradeTypeItem = styled(ButtonMenuItem)<{ active?: boolean }>`
  height: 32px;
  font-size: 14px;
  border-radius: 0px;
  color: ${({ active }) => active ? '#FFF' : '#8F8F8F'};
  /* border-bottom: ${({ active }) => active && '2px solid #90E0EF'}; */
  /* background: transparent; */
  background-color: transparent;
  padding: 0 10px;  
  font-weight: 300;
  /* width: 50%; */

  :hover:not(:disabled):not(.button--disabled):not(:active) {
    color: ${({ active }) => active && '#FFF'};
    /* border-bottom: ${({ active }) => active && '2px solid #90E0EF'}; */
    background: transparent;
  }
`;
