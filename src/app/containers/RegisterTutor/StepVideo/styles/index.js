import styled from 'styled-components';
import { media } from 'styles/media';

export const Introduction = styled.div`
  display: flex;
  .intro-image {
    width: 115px;
    height: 117.31px;
    margin-right: 25px;
  }

  ${media.mobile`
    flex-direction: column;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  .full-width {
    width: 100%;
    max-width: 100%;
    input,
    textarea {
      width: 100%;
    }
  }
  .video-upload {
    width: 100%;
    video {
      width: 100%;
    }
  }
`;

export const VideoUpload = styled.div`
  width: 500px;
  height: 293px;
  border: 1px solid rgb(221, 221, 221);
  margin: 10px 0;
`;

export const StyledVideoUpload = styled.div`
  width: 500px;
  height: 293px;
  border: 1px solid rgb(221, 221, 221);
  margin: 10px 0;
`;
