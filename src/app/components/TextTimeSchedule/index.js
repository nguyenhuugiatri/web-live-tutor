import React from 'react';
import { StyledText, StyledTextTimeSchedule } from './styles';

const colorBackgroundText = type => {
  let color;
  switch (type) {
    case 'Red':
      color = {
        text: '#B73E89',
        background: '#FFE2F9',
      };
      break;
    case 'Green':
      color = {
        text: '#5A8F91',
        background: '#D7F9F5',
      };
      break;
    case 'Purple':
      color = {
        text: '#7766C7',
        background: '#EEEAFF',
      };
      break;
    default:
  }
  return color;
};
const TextTimeSchedule = ({ content, color, typeText, ...rest }) => {
  return (
    <StyledTextTimeSchedule color={colorBackgroundText(typeText).background}>
      <StyledText color={colorBackgroundText(typeText).text}>
        {content}
      </StyledText>
    </StyledTextTimeSchedule>
  );
};

export default TextTimeSchedule;
