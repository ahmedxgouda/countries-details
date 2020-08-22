import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={Store()}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
