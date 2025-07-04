import { Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home';
import './App.css';
import CountriesApp from './pages/CountriesApp';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountriesApp />} />
      </Routes>
    </>
  );
};

export default App;
