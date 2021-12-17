
import styled from 'styled-components';
import { Button } from '@evercreative/onidex-uikit'

const ActionButton = styled(Button)`
  color: ${({ theme }) => theme.isDark && '#ffffff' };
`;

export default ActionButton;