import React, { useReducer } from 'react';
import ContextStore, { rootReducer, initState } from './ContextStore';
import Layout from './components/Layout';
import Header from './components/Header';

const App: React.FC = () => {
  const [appState, dispatch] = useReducer(rootReducer, initState);
  return (
    <div className="app">
      <ContextStore.Provider value={{ appState, dispatch }}>
        <Header />
        <Layout />
      </ContextStore.Provider>
    </div>
  );
};

export default App;
