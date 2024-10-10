import logo from './logo.svg';
import './App.css';
import HomePage from './page/HomePage';
import { useState } from 'react';
import LoginPage from './page/LoginPage';

function App() {
  const [isLogin, setLogin] = useState(null)

  const handleStatefromChild = (state) =>{
    setLogin(true);
  }

  return (
    <div className="App">
      {
        isLogin ? <HomePage /> : <LoginPage setLog={handleStatefromChild} />
      }
    </div>
  );
}

export default App;
