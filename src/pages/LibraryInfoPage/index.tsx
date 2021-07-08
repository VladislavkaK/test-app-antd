import React, { FC } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from "react-router-dom";
import { PageHeader, List } from 'antd';
import { Library } from '../../store/libraries/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding-top: 100px;
  width: 100%;
  padding-bottom: 100px;
`;

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const LibraryInfoPage: FC = () => {
  const { state } = useLocation<Library>();
  const history = useHistory();

  const keys = Object.keys(state);
  const values = Object.values(state);

  return (
    <StyledContainer>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title={state.fullname}
      />
      <StyledListContainer>
        <List
          size="small"
          bordered
          dataSource={keys}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
        <List
          size="small"
          bordered
          dataSource={values}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </StyledListContainer>
    </StyledContainer>
  );
}

export default LibraryInfoPage;
