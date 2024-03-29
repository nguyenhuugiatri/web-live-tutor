/* eslint-disable react-hooks/exhaustive-deps */
import { Tag } from 'antd';
import { POPUP_TYPE } from 'app/containers/Popup/constants';
import { actions as popupActions } from 'app/containers/Popup/slice';
import useActions from 'hooks/useActions';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { mapHistoryDataSource } from 'utils/common';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import {
  makeListHistory,
  makeSelectLoading,
  makeTutorCount,
  selectAllFeedbacks,
} from './selectors';
import { selectReviewTutor } from 'app/containers/Home/selectors';
import { actions } from './slice';
import Button from 'app/components/Button';
import qs from 'query-string';

export const useHook = () => {
  const totalCount = useSelector(makeTutorCount);
  const selectorAllFeedbacks = useSelector(selectAllFeedbacks);
  const selectorReview = useSelector(selectReviewTutor);
  const history = useHistory();
  const location = useLocation();
  const {
    fetchHistory,
    changeTargetIsTutor,
    getAllFeedbacks,
    openPopup,
  } = useActions(
    {
      fetchHistory: actions.fetchHistory,
      changeTargetIsTutor: actions.changeTargetIsTutor,
      getAllFeedbacks: actions.getAllFeedbacks,
      openPopup: popupActions.openPopup,
    },
    [actions],
  );
  const user = getUserFromStorage();
  const isTutor = user?.currentRole === 'tutor';

  useEffect(() => {
    const { page } = qs.parse(location.search);
    fetchHistory({ isTutor, page: +page || 1 });
  }, [selectorReview.data]);

  useEffect(() => {
    getAllFeedbacks(user.id);
  }, [user.id]);

  const changeCategory = useCallback(
    selected => {
      changeTargetIsTutor(selected === 'tutor');
    },
    [changeTargetIsTutor],
  );

  const onChangePage = useCallback(
    value => {
      history.push(`/history?page=${+value}`);
    },
    [history],
  );

  const handleShowReviews = useCallback(
    reviews => {
      openPopup({
        key: 'reviews-modal',
        type: POPUP_TYPE.REVIEW_MODAL,
        reviews,
      });
    },
    [openPopup],
  );

  return {
    selectors: {
      isTutor,
      totalCount,
      allFeedbacks: selectorAllFeedbacks.data,
    },
    handles: {
      changeCategory,
      onChangePage,
      handleShowReviews,
    },
  };
};

export const useForm = () => {
  const { t } = useTranslation();
  const historyList = useSelector(makeListHistory);
  const loading = useSelector(makeSelectLoading);
  const user = getUserFromStorage();
  const isTutor = user?.currentRole === 'tutor';

  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);
  const showRatingForm = useCallback(
    tutor => {
      openPopup({
        key: 'showRatingForm',
        type: POPUP_TYPE.RATING_MODAL,
        tutor,
      });
    },
    [openPopup],
  );
  const handleShowReviews = useCallback(
    reviews => {
      openPopup({
        key: 'reviews-modal',
        type: POPUP_TYPE.REVIEW_MODAL,
        reviews,
      });
    },
    [openPopup],
  );
  const datasource = mapHistoryDataSource(historyList, isTutor);
  const columns = [
    {
      title: <p className="title">{t('History.orderNumber')}</p>,
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      align: 'center',
      width: '55px',
    },
    {
      title: (
        <p className="title">
          {t(`History.${isTutor ? 'studentName' : 'tutorName'}`)}
        </p>
      ),
      dataIndex: isTutor ? 'studentName' : 'tutorName',
      key: 'name',
      fixed: 'left',
      ellipsis: true,
      width: '20%',
    },
    {
      title: <p className="title">{t('History.startTime')}</p>,
      dataIndex: 'startTime',
      key: 'startTime',
      render: value => <Tag color="blue">{value}</Tag>,
    },
    {
      title: <p className="title">{t('History.endTime')}</p>,
      dataIndex: 'endTime',
      key: 'endTime',
      render: value => <Tag color="volcano">{value}</Tag>,
    },
    {
      title: <p className="title">{t('History.during')}</p>,
      key: 'during',
      dataIndex: 'during',
    },
    {
      title: <p className="title">{t('History.review')}</p>,
      key: 'control',
      width: '120px',
      align: 'center',
      render: (_, record) => {
        const showBtnReviewed = isTutor
          ? record.isTutorReviewed
          : record.isReviewed;

        return showBtnReviewed ? (
          <Button
            style={{ marginRight: 0, justifyContent: 'center', width: '100px' }}
            onClick={() => {
              const userName = isTutor ? record.studentName : record.tutorName;
              handleShowReviews({
                sessionId: record.sessionId,
                userName,
              });
            }}
          >
            {t('History.view')}
          </Button>
        ) : (
          <Button
            style={{ marginRight: 0, justifyContent: 'center', width: '100px' }}
            type="accent"
            onClick={() => {
              const tutor = {
                userId: isTutor ? record.studentId : record.tutorId,
                sessionId: record.sessionId,
                isTutor,
              };
              showRatingForm(tutor);
            }}
          >
            {t('History.review')}
          </Button>
        );
      },
    },
  ];

  return {
    columns,
    loading,
    dataSource: datasource,
    size: 'small',
    pagination: false,
    scroll: { x: 850 },
    bordered: false,
    locale: {
      emptyText: t('Common.empty'),
    },
  };
};
