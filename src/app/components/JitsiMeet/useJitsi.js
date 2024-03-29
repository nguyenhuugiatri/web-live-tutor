import { useState, useEffect } from 'react';
const useJitsi = props => {
  const {
    domain = 'meet.livetutor.live',
    parentNode,
    subject,
    password,
    displayName,
    onMeetingEnd,
    onSomeOneLeave,
    onParticipantJoin,
    onVideoConferenceJoin,
    ...options
  } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jitsi, setJitsi] = useState(null);

  useEffect(() => {
    if (!window.JitsiMeetExternalAPI) {
      setError(
        'JitsiMeetExternalAPI is not available, check if https://meet.jit.si/external_api.js was loaded',
      );
      return;
    }

    options.parentNode = document.getElementById(parentNode);
    if (!options.parentNode) {
      setError(
        `Parent node is not available, check container have the correct id: "${parentNode}"`,
      );
      return;
    }

    const client = new window.JitsiMeetExternalAPI(domain, { ...options });
    setJitsi(client);
    setLoading(false);
    setError(null);

    subject && client.executeCommand('subject', subject);

    client.addEventListener('videoConferenceJoined', onVideoConferenceJoin);

    client.addEventListener('participantJoined', onParticipantJoin);

    client.addEventListener('passwordRequired', () => {
      password && client.executeCommand('password', password);
    });
    onSomeOneLeave &&
      client.addEventListener('participantLeft', onSomeOneLeave);

    onMeetingEnd && client.addEventListener('readyToClose', onMeetingEnd);

    return () => jitsi && jitsi.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.JitsiMeetExternalAPI]);

  return { jitsi, error, loading };
};

export default useJitsi;
