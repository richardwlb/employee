import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Routes from './routes';


// function App() {
const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
