import React, { memo } from 'react';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import DatePicker from 'app/components/DatePicker';
import Select from 'app/components/Select';
import { Avatar, Collapse, Skeleton, Typography } from 'antd';
import { Row, Col } from 'app/components/Grid';
import useHooks from './hooks';
import saga from './saga';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { reducer, sliceKey } from './slice';
import {
  StyledProfile,
  StyledAvatar,
  StyledEditIcon,
  StyledBasicInfo,
  StyledIconEdit,
  StyledDetailInfo,
} from './styles';
import { useTranslation } from 'react-i18next';
import UploadAvatar from './UploadAva';
import COUNTRIES from 'utils/countries';
import moment from 'moment';
import { ACTION_STATUS, DEFAULT_PICKER_VALUE, ROLES } from 'utils/constants';
import TutorInfo from './TutorInfo';
const { Panel } = Collapse;

export const Profile = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { onFinish, openModal, modalControl, handleShowReviews } = handlers;
  const {
    info,
    form,
    loading,
    avatarUploadVisible,
    loadingUpload,
    getStatus,
    currentRole,
    allFeedbacks,
  } = selectors;
  const { t } = useTranslation();

  return (
    <StyledProfile justify="center">
      <Col lg={16} md={20} xs={24}>
        <StyledBasicInfo>
          {(getStatus === ACTION_STATUS.PENDING && (
            <Skeleton avatar active paragraph={{ rows: 1 }} />
          )) || (
            <Row justify="center" align="middle">
              <Col md={9} xs={24}>
                <Row justify="center">
                  <StyledAvatar>
                    <Avatar size={130} src={info?.avatar} />
                    <StyledIconEdit onClick={openModal}>
                      <StyledEditIcon />
                    </StyledIconEdit>
                    <UploadAvatar
                      visible={avatarUploadVisible}
                      loading={loadingUpload}
                      {...modalControl}
                    ></UploadAvatar>
                  </StyledAvatar>
                </Row>
              </Col>
              <Col md={15} xs={24} className="group-info">
                <h3>{info?.name || 'Anonymous'}</h3>
                <span>{`${t('Profile.accountID')}: ${info?.id}`}</span>
                <Typography.Link
                  href={false}
                  onClick={() =>
                    handleShowReviews({
                      feedbacks: allFeedbacks,
                    })
                  }
                >
                  {t('Profile.showOthersReview')}
                </Typography.Link>
              </Col>
            </Row>
          )}
        </StyledBasicInfo>

        <StyledDetailInfo>
          <Collapse className="collapse" defaultActiveKey={['1']} accordion>
            <Panel
              className="align-center-panel"
              showArrow={false}
              header={t('Profile.account')}
              key="1"
            >
              {(getStatus === ACTION_STATUS.PENDING && (
                <Skeleton active paragraph={{ rows: 4 }} />
              )) || (
                <>
                  <Form
                    id="profile-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                    className="profile-form"
                    form={form}
                    onFinish={onFinish}
                    requiredMark={false}
                    initialValues={info ?? {}}
                  >
                    <Form.Item
                      label={t('Profile.name')}
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: t('Profile.requiredName'),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={t('Profile.email')}
                      name="email"
                      rules={[
                        {
                          type: 'email',
                          message: t('Profile.invalidEmail'),
                        },
                        {
                          required: true,
                          message: t('Profile.requiredEmail'),
                        },
                      ]}
                    >
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label={t('Profile.phone')} name="phone">
                      <Input />
                    </Form.Item>
                    <Form.Item label={t('Profile.country')} name="country">
                      <Select>
                        {Object.entries(COUNTRIES).map(([key, value]) => (
                          <Select.Option value={key} key={key}>
                            {value}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Col>
                      <Form.Item label={t('Profile.birthday')} name="birthday">
                        <DatePicker
                          showToday={false}
                          defaultPickerValue={moment(DEFAULT_PICKER_VALUE)}
                        />
                      </Form.Item>
                    </Col>
                  </Form>
                  <Row justify="end">
                    <Col>
                      <Button
                        form="profile-form"
                        className="submit-btn"
                        type="accent"
                        htmlType="submit"
                        loading={loading}
                      >
                        {t('Profile.btnSave')}
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Panel>
            {currentRole === ROLES.TUTOR && (
              <Panel
                className="align-center-panel"
                showArrow={false}
                header={t('Profile.tutorInfo')}
                key="2"
              >
                {(getStatus === ACTION_STATUS.PENDING && (
                  <Skeleton active paragraph={{ rows: 4 }} />
                )) || <TutorInfo />}
              </Panel>
            )}
          </Collapse>
        </StyledDetailInfo>
      </Col>
    </StyledProfile>
  );
};

export default memo(Profile);
