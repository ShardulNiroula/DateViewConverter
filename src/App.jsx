import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Clock from './pages/clock/Clock';
import Calendar from './pages/calendar/Calendar';
import Compare from './pages/compare/Compare';
import Convert from './pages/convert/Convert';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clock" element={<Clock />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/convert" element={<Convert />} />
      </Routes>
    </Layout>
  );
}

export default App;
