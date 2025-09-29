import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Menubar from './components/Menubar.jsx';
import {Toaster} from "react-hot-toast";
import Landing from "./pages/Landing/Landing.jsx";
import MainPage from './pages/MainPage';
import Preview from './pages/Preview';
import Dashboard from './pages/Dashboard';
import UserSyncHandler from './components/UserSyncHandler.jsx';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

const App = () => {
  return(
    <BrowserRouter>
      <UserSyncHandler />
      <Menubar />
      <Toaster />

      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/dashboard" 
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } 
        />

        <Route path="/generate" 
          element={
            <>
              <SignedIn>
                <MainPage />
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } 
        />

        <Route path="/preview" 
          element={
            <>
              <SignedIn>
                <Preview />
              </SignedIn>

              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;