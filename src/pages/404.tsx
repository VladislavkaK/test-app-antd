import React, { FC } from 'react';
import styled from 'styled-components';
import { Result } from 'antd';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const NotFound: FC = () => (
  <StyledContainer>
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена!"
    />
  </StyledContainer>
);

export default NotFound;
