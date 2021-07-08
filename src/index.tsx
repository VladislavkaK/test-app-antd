import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import App from './app';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ConfigProvider locale={ruRU}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
