import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SingleArticlePage from './pages/SingleArticlePage';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import './App.css';

function App() {
  return (
    <Router>
      <div className='bg-gray-300 p-4'>
        <ScrollTop />
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/article/:id" component={SingleArticlePage} />
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/categories" component={CategoryPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

