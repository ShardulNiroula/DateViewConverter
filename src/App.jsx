import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Clock from './pages/clock/Clock';
import Compare from './pages/compare/Compare';
import Convert from './pages/convert/Convert';
import ClockFullscreen from './pages/clock/ClockFullscreen';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/convert" element={<Convert />} />
      </Route>
      <Route path="/clock/fullscreen" element={<ClockFullscreen />} />
    </Routes>
  );
}

export default App;
