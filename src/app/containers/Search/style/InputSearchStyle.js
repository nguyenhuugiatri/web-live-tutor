import styled from 'styled-components';
import { media } from 'styles/media';

export const WrapInputSearch = styled.div`
  max-width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 16px;
  padding-left: 30px;
  padding-right: 38px;
  background-color: #eff3f6;
  line-height: 24px;
  font-weight: 400;
  outline: none;
  transition: background-color 200ms ease, outline 200ms ease, color 200ms ease,
    box-shadow 200ms ease, -webkit-box-shadow 200ms ease;
  appearance: none;
  color: #0d0c22;
  letter-spacing: 1px;
  border: 1px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  &::placeholder {
    color: #5f7d95;
  }
`;

export const CoverInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 55%;
  position: relative;
  border-radius: 8px;
  .ant-badge {
    height: 100%;
  }
  ${media.custom700px`
    width: unset;
  `}
`;

export const StyledClearButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  align-items: center !important;
  background-color: #eff3f6;
  padding: 0 15px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;
