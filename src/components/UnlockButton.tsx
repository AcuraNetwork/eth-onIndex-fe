import React from 'react'
import styled from 'styled-components';
import { Button, useWalletModal } from '@evercreative/onidex-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const StyledButton = styled(Button)`
  background: linear-gradient(83.26deg, #FA5368 -15.09%, #CF203C 31.7%);
  color: ${({ theme }) => !theme.isDark ? theme.colors.primary : 'white' };
  border: none;
  border-radius: 12px;
`;

const UnlockButton = (props) => {
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  // console.log("account ::", account)
  return (
    <StyledButton variant='secondary' onClick={onPresentConnectModal} {...props}>
      Connect Wallet
    </StyledButton>
  )
}

export default UnlockButton
