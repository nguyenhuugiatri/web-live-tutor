import React, { memo } from 'react';
import { StyledModal } from './styles';
import { Collapse, Typography, Row, Col, Form, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import Button from 'app/components/Button';
import TransactionListTable from './TransactionListTable';

const { Title } = Typography;

const ModalTransaction = memo(props => {
  const { visible, onCancel, transactions, ...rest } = props;
  const { t } = useTranslation();
  return (
    <StyledModal
      centered
      closable={false}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>,
      ]}
      {...rest}
    >
      <Title level={4} className="payment-title">
        {t('Payment.transactionsList')}
      </Title>
      <TransactionListTable
        totalCount={transactions.length}
        dataSource={transactions}
      ></TransactionListTable>
    </StyledModal>
  );
});

export default ModalTransaction;
