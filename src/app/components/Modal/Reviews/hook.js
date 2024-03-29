import { actions } from 'app/containers/History/slice';
import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { selectFeedbackSession } from 'app/containers/History/selectors';
import { useSelector } from 'react-redux';

export const useHooks = props => {
  const selectorFeedbackSession = useSelector(selectFeedbackSession);
  const { reviews } = props;
  const { getFeedbackSession } = useActions(
    {
      getFeedbackSession: actions.getFeedbackSession,
    },
    [actions],
  );

  useEffect(() => {
    if (reviews.sessionId) getFeedbackSession(reviews.sessionId);
  }, [getFeedbackSession, reviews.sessionId]);

  return {
    selectors: {
      reviews: reviews.sessionId
        ? selectorFeedbackSession.data
        : reviews.feedbacks,
      userName: reviews.userName ? reviews.userName : '',
      selectorFeedbackSession,
    },
  };
};

export default useHooks;
