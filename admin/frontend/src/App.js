import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import ForgotPassword from './components/forgotpass';
import ChangePassword from './components/changepass';
import Homepage from './components/homepage';
import DownloadPage from './components/download-page';
import ProtectedRoute from './components/protected-route';
import SimpleProtectedRoute from './components/simpleprotected-route';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        {/* <Route path="/changepass" element={<ChangePassword />} /> */}
        <Route path="/downloadpage" element={
          <ProtectedRoute>
            <DownloadPage />
          </ProtectedRoute>
        } />
        <Route path="/changepass" element={
          <SimpleProtectedRoute>
            <ChangePassword />
          </SimpleProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
