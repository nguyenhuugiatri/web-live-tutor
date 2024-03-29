export const AUTH_INFO_KEY = 'AuthenticationInfo';

export const TRANSACTION_TOKEN = 'TransactionToken';

export const PARTICIPANT_JOIN = 'ParticipantJoin';

export const ACTION_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const COMMON_PROPERTIES = {
  status: '',
  data: null,
  error: null,
};

export const TIME_IN_ROOM = 5 * 60;

export const ROLES = {
  GUEST: 'guest',
  STUDENT: 'student',
  ADMIN: 'admin',
  TUTOR: 'tutor',
};

export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export const DATE_TIME_FORMAT_YY_MM_HH_MM_SS = 'YY-MM-DD HH:mm:ss';

export const DEFAULT_PICKER_VALUE = '12-06-1999';

export const TRANSACTION_TYPES = {
  BUY: 'buy',
  SELL: 'sell',
  DEPOSIT: 'deposit',
  CANCEL: 'cancel',
  RETURN: 'return',
};

export const errorCode = {
  0: 'INVALID_TOKEN_TYPE',
  // 1: 'PLEASE_AUTHENTICATE',
  2: 'ACCOUNT_NOT_ACTIVATED',
  3: 'PERMISSION_DENIED',
  4: 'EMAIL_EXIST',
  5: 'EMAIL_NOT_EXIST',
  6: 'USER_NOT_REQUEST_CHANGEPW',
  7: 'INCORRECT_EMAIL_PASSWORD',
  8: 'HAVE_BEEN_TUTOR',
  9: 'FILE_TYPE_NOT_SUPPORT',
  10: 'BOOKING_CANCEL_BEFORE_1DAY',
  11: 'BOOKING_EXIST',
  12: 'BOOKING_NOT_EXIST',
  13: 'PAYMENT_SYSTEM',
  14: 'WALLET_BLOCKED',
  16: 'SELLER_NOT_ENOUGH',
  17: 'END_GREATER_START',
  18: 'PERIOD_DIVISIABLE_30',
  19: 'SCHEDULE_DUPLICATE',
  20: 'SCHEDULE_INVALID_DATE',
  21: 'INVALID_REFRESH_TOKEN',
  24: 'FILE_SIZE_OVER_LIMIT_AVATAR',
  25: 'FILE_SIZE_OVER_LIMIT_VIDEO',
};
