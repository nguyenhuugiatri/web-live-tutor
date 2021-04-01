import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const selectScheduleState = state => state.scheduleRegister;

export const selectScheduleTutor = createSelector(
  selectScheduleState,
  scheduleState => get('scheduleTutor', scheduleState),
);

export const selectDetailScheduleTutor = createSelector(
  selectScheduleState,
  scheduleState => get('getDetailSchedule', scheduleState),
);

export const selectbookTimeSchedule = createSelector(
  selectScheduleState,
  scheduleState => get('bookTimeSchedule', scheduleState),
);

export const selectScheduleTutorId = createSelector(
  selectScheduleState,
  scheduleState => get('scheduleTutorById', scheduleState),
);

export const selectScheduleTutorByDate = createSelector(
  selectScheduleState,
  scheduleState => get('scheduleTutorByDate', scheduleState),
);

export const selectRegisterSchedule = createSelector(
  selectScheduleState,
  scheduleState => get('registerSchedule', scheduleState),
);

export const selectUnRegisterSchedule = createSelector(
  selectScheduleState,
  scheduleState => get('unRegisterSchedule', scheduleState),
);