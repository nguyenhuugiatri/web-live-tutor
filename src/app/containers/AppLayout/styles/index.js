import styled from 'styled-components';
import Layout from 'app/components/Layout';
import { COLOR } from 'styles/colorPalette';
import { media } from 'styles/media';
const { Content, Footer, Header } = Layout;
const maxWidth = 1370;

export const StyledAvatar = styled.div`
  cursor: pointer;
  .avt-wrapper {
    padding: ${({ isExistName }) => (isExistName ? '5px 5px 5px 10px' : '5px')};
    display: flex;
    align-items: center;
    margin-left: 5px;
    border-radius: 30px;
    transition: ease 0.2s;
    .user-name {
      white-space: nowrap;
      margin-right: 6px;
      font-weight: 600;
      height: 38px;
      display: flex;
      align-items: center;
    }
    &:hover {
      background-color: #e4e6eb;
    }
  }
`;

export const StyledIcon = styled.img`
  display: inline-block;
  width: 22px;
  height: 22px;
  cursor: pointer;
  transition: ease 0.2s;
  &.menu-icon {
    width: 38px;
    height: 38px;
    background-color: #e4e6eb;
    padding: 10px;
    border-radius: 50%;
    transition: ease 0.2s;
    &:hover {
      background-color: #cccccc;
    }
  }
`;

export const StyledHeader = styled(Header)`
  .login-register-group {
    .language {
      margin-right: 10px;
    }
  }

  .avatar {
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  position: fixed;
  width: 100%;
  height: 70px;
  z-index: 1000;
  background-color: ${COLOR.WHITE};
  border-bottom: solid 4px ${COLOR.CORNFLOWER};
  box-shadow: 0 -1px 13px 2px ${COLOR.BLACK_20};

  .header-wrapper {
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .left-menu {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .right-menu {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .sub-btn {
      margin-right: 5px;
    }
    .menu-icon.more-btn {
      display: none;
    }
    .menu-icon {
      font-size: 18px;
      transition: ease 0.2s;
      color: #646464;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: #e4e6eb;
      padding: 10px;
      border-radius: 50%;
      transition: ease 0.2s;
      &:hover {
        background-color: #cccccc;
      }
    }
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    width: 220px;
  }

  .ant-menu-horizontal > {
    .ant-menu-item a {
      color: #7d7d7d;
      font-size: 16px;
      text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
      &:hover {
        color: ${COLOR.CORNFLOWER};
      }
    }
    .ant-menu-item-selected a {
      color: ${COLOR.CORNFLOWER};
    }
    .ant-menu-item:hover {
      border-color: ${COLOR.CORNFLOWER};
    }
  }

  ${media.tablet`
    .header-wrapper{
      .profile-menu{
        display: none;
      }
      .sub-btn{
        display: none;
      }
      .right-menu{
        .menu-icon.more-btn{
          display: block;
        }
      };
      .left-menu{
        .nav-item-menus{
          display: none;
        }
      }
    }
  `}

  ${media.custom600px`
    padding: 0 22px 0 30px;
    .login-btn, .register-button{
      display: none;
    }
    .login-register-group {
      .language {
        margin-right: 0;
      }
    }
  `}

  ${media.custom500px`
    padding: 0 10px 0 18px;
    .header-wrapper{
      .logo-wrapper{
        height: 64px;
        width: unset;
      }
    }
  `}
`;

export const StyledLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
`;

export const StyledContent = styled(Content)`
  min-height: calc(100vh - 140px);
  background-color: ${COLOR.WHITE};
  width: 100%;
  position: relative;

  .content-wrapper {
    min-height: calc(100vh - 140px);
    padding: 35px 30px;
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    justify-content: center;
    display: flex;
    margin-top: 70px;
    ${media.custom600px`
      padding: 35px 10px;
    `}
  }
`;

export const StyledMeeting = styled(Content)`
  width: 100%;
`;

export const StyledFooter = styled(Footer)`
  z-index: 10;
  border: none;
  background: #525961;
  color: #ddd;
  width: 100%;
  padding: 22.5px 50px;

  .footer-wrapper {
    height: 100%;
    max-width: ${`${maxWidth}px`};
    margin: 0 auto;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .group-menus,
    .group-icons {
      * {
        margin-right: 15px;
        cursor: pointer;
      }
    }
    .group-icons {
      font-size: 16px;
    }
    ${media.custom600px`
    justify-content: center;
    .group-menus,
    .group-icons {
      margin-bottom:10px;
    }
      `}
  }
`;
