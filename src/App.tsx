import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SplashPage } from './pages/SplashPage';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/restaurants" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
