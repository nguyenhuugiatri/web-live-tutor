import {
  selectRegisterSchedule,
  selectScheduleTutorByDate,
  selectUnRegisterSchedule,
} from 'app/containers/ScheduleTutor/selectors';
import { actions } from 'app/containers/ScheduleTutor/slice';
import useActions from 'hooks/useActions';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ACTION_STATUS, DATE_FORMAT, TIME_FORMAT } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import { notifyError } from 'utils/notify';

export const TIME = {
  startTime: 0,
  endTime: 1,
  total: 2,
};

export const useHooks = props => {
  const { data } = props;
  const user = getUserFromStorage();
  const selectorRegisterSchedule = useSelector(selectRegisterSchedule);
  const selectorUnRegisterSchedule = useSelector(selectUnRegisterSchedule);
  const selectorScheduleTutorByDate = useSelector(selectScheduleTutorByDate);
  const [freeTimes, setFreeTimes] = useState([]);
  const [startTimeSelect, setStartTime] = useState(null);
  const [endTimeSelect, setEndTime] = useState(null);
  const [isRepeated, setRepeated] = useState(false);
  const [endDate, setEndDate] = useState(data.date);
  const { t } = useTranslation();

  const {
    registerSchedule,
    unRegisterSchedule,
    getFreeScheduleByDate,
    getFreeSchedule,
  } = useActions(
    {
      registerSchedule: actions.registerSchedule,
      getFreeSchedule: actions.getFreeSchedule,
      unRegisterSchedule: actions.unRegisterSchedule,
      getFreeScheduleByDate: actions.getFreeScheduleByDate,
    },
    [actions],
  );

  useEffect(() => {
    getFreeScheduleByDate({
      date: data.date,
      tutorId: user?.id,
    });
  }, [getFreeScheduleByDate, data, user?.id]);

  useEffect(() => {
    if (selectorScheduleTutorByDate.status === ACTION_STATUS.SUCCESS) {
      setFreeTimes(selectorScheduleTutorByDate.data);
    } else {
      setFreeTimes([]);
    }
  }, [selectorScheduleTutorByDate]);

  useEffect(() => {
    if (
      selectorRegisterSchedule.status === ACTION_STATUS.SUCCESS ||
      selectorUnRegisterSchedule.status === ACTION_STATUS.SUCCESS
    ) {
      getFreeSchedule();
      getFreeScheduleByDate({
        date: data.date,
        tutorId: user?.id,
      });
    }
  }, [
    selectorRegisterSchedule,
    selectorUnRegisterSchedule,
    data,
    getFreeSchedule,
    user?.id,
    getFreeScheduleByDate,
  ]);

  const handleAddDateSchedule = ({ startTimeSelect, endTimeSelect }) => {
    const startTime = moment(startTimeSelect).format(TIME_FORMAT);
    const endTime = moment(endTimeSelect).format(TIME_FORMAT);
    const isValidDate = moment(endDate).isAfter(data.date);
    if (isRepeated) {
      if (isValidDate) {
        registerSchedule({
          startTime,
          endTime,
          isRepeated,
          startDate: data.date,
          endDate: moment(endDate).format(DATE_FORMAT),
        });
      } else {
        notifyError(`${t('Notify.validEndDate')}`);
      }
    } else {
      registerSchedule({
        startTime,
        endTime,
        date: data.date,
      });
    }
  };

  const handleChangePickTime = time => {
    if (time && time.length === TIME.total) {
      setStartTime(time[TIME.startTime]);
      setEndTime(time[TIME.endTime]);
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleUnRegisterSchedule = id => {
    unRegisterSchedule(id);
  };

  const onChangeRepeatDay = checked => {
    setRepeated(checked);
  };

  const onChangeEndDate = date => {
    setEndDate(date);
  };

  return {
    handlers: {
      handleAddDateSchedule,
      handleUnRegisterSchedule,
      handleChangePickTime,
      onChangeRepeatDay,
      onChangeEndDate,
    },
    selectors: {
      currentDate: data.date,
      freeTimes,
      startTimeSelect,
      endTimeSelect,
      isRepeated,
    },
  };
};

export default useHooks;
