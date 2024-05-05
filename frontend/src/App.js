import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import NewActivity from './components/NewActivity';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/*'} element={<Activities />}></Route>
          <Route path={'/new'} element={<NewActivity />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
