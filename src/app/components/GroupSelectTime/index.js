import { CheckSquareFilled } from '@ant-design/icons';
import { Checkbox, Row } from 'antd';
import moment from 'moment';
import React, { memo } from 'react';
import TextTimeSchedule from '../TextTimeSchedule';
import { StyledGroupSelectTime } from './styles';

const mapDataScheduleTo2Rows = scheduleDetails => {
  const result = [];
  let tmp = [];
  scheduleDetails.forEach((time, index) => {
    if (
      tmp[0] &&
      time.startPeriod.split(':')[0] === tmp[0].startPeriod.split(':')[0]
    ) {
      tmp.push(time);
      result.push(tmp);
      tmp = [];
    } else {
      tmp = [time];
      if (index === scheduleDetails.length - 1) result.push(tmp);
    }
  });
  return result;
};

const GroupSelectTime = memo(props => {
  const { scheduleDetails, dateSelected, ...rest } = props;
  const dataSource = mapDataScheduleTo2Rows(scheduleDetails);
  const dateFormat = moment(dateSelected).format('YYYY-MM-DD');

  return (
    <StyledGroupSelectTime>
      <Checkbox.Group {...rest} style={{ width: '100%' }}>
        {(dataSource || []).map(times => {
          return (
            <Row
              className="justify-content-between"
              style={{ padding: '0px 50px' }}
            >
              {times.map(time => {
                return (
                  <Checkbox
                    value={time.id}
                    key={time.id}
                    checked={false}
                    disabled={
                      time.isBooked ||
                      !moment(
                        `${dateFormat} ${time.startPeriod}`,
                        'YYYY-MM-DD HH:mm',
                      ).isAfter(moment())
                    }
                  >
                    {(time.isBooked ||
                      !moment(
                        `${dateFormat} ${time.startPeriod}`,
                        'YYYY-MM-DD HH:mm',
                      ).isAfter(moment())) && (
                      <CheckSquareFilled className="icon-checked" />
                    )}
                    <TextTimeSchedule
                      className="time-select"
                      typeText={
                        time.isBooked ||
                        !moment(
                          `${dateFormat} ${time.startPeriod}`,
                          'YYYY-MM-DD HH:mm',
                        ).isAfter(moment())
                          ? 'Gray'
                          : 'Purple'
                      }
                      content={`${time.startPeriod} - ${time.endPeriod}`}
                    />
                  </Checkbox>
                );
              })}
            </Row>
          );
        })}
      </Checkbox.Group>
    </StyledGroupSelectTime>
  );
});

export default GroupSelectTime;
