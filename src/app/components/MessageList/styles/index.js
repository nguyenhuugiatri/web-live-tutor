import styled from 'styled-components';
import { COLOR } from 'styles/colorPalette';

export const StyledMessageList = styled.div`
  & > * {
    margin-bottom: 20px;
  }
  padding: 20px 25px 5px 25px;
  background-color: white;
  border-radius: 0.4em;
  box-shadow: 0px 4px 16px ${COLOR.SHADOW_GRAY};
`;
