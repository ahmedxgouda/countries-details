import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Main from './components/Main';
import { HashRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Provider store={Store()}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );
}

export default App;
