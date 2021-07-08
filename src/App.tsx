import React, { FC }  from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import { store } from './store';
import { GlobalStyle } from './styles/theme/global';
import { theme } from './styles/theme'

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
