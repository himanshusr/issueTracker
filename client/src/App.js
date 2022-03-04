import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';
import { getIssues } from './actions/issue';

function App() {
  useEffect(() => {
    store.dispatch(getIssues());
  }, []);
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Dashboard />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
