import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Menubar from './components/Menubar.jsx';
import {Toaster} from "react-hot-toast";
import Landing from "./pages/Landing/Landing.jsx";
import MainPage from './pages/MainPage';
import Preview from './pages/Preview';
import Dashboard from './pages/Dashboard';

const App = () => {
  return(
    <BrowserRouter>
      <Menubar />
      <Toaster />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<MainPage />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;