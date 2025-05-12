import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import './App.css';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <div className="app-container">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search/:query/*" element={<SearchPage />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;