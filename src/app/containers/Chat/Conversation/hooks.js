import { useState, useCallback, useEffect, useRef } from 'react';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';
import socket from 'utils/socket';
import moment from 'moment';

export const useHooks = props => {
  const { fromId, toId } = props;
  const user = getUserFromStorage();
  const [messages, setMessages] = useState([]);

  const inputRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    socket.emit('chat:getMessages', { fromId, toId });
  }, [fromId, toId]);

  useEffect(() => {
    socket.on('chat:returnMessages', ({ messages }) => {
      const list = messages.map(message => {
        return {
          ...message,
          direction: message.fromInfo?.id === user?.id ? 'right' : 'left',
          name: message.fromInfo?.name ?? 'Anonymous',
          createdAt: moment(message.createdAt).format('LT'),
        };
      });
      socket.off('chat:returnMessages');
      setMessages(list);
    });
  }, [user]);

  useEffect(() => {
    if (listRef) {
      listRef.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);

  const handleOnPressEnter = useCallback(
    e => {
      if (e.target.value)
        socket.emit('chat:sendMessage', {
          fromId,
          toId,
          content: e.target.value,
        });
      inputRef.current.setValue('');
    },
    [fromId, toId],
  );

  return {
    selectors: { inputRef, listRef },
    handlers: { handleOnPressEnter },
    states: { messages },
  };
};

export default useHooks;
