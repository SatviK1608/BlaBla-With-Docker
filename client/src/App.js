import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import YourCarsPage from './pages/YourCarsPage';
import AddCarPage from './pages/AddCarPage';
import YourRidesPage from './pages/YourRidesPage';
import RidesPage from './pages/RidesPage';
import PrevRidesPage from './pages/PrevRidesPage';
import ViewUsersPage from './pages/ViewUsersPage';
import AdminNavbar from './components/AdminNavbar';
import UserNavbar from './components/UserNavbar';
import UpdateProfilePage from './pages/UpdateProfilePage'
import { Toaster } from './components/Toaster';
import UpdateCarPage from './pages/UpdateCarPage';
import CreateRidePage from './pages/CreateRidePage';
import UpdateRidePage from './pages/UpdateRidePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AdminRidePage from './pages/AdminRidePage';
const App = () => {
  return (
    <>
      
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/your-cars" element={<YourCarsPage />} />
      <Route path="/add-car" element={<AddCarPage />} />
      <Route path="/your-rides" element={<YourRidesPage />} />
      <Route path="/rides" element={<RidesPage />} />
      <Route path="/prev-rides" element={<PrevRidesPage />} />
      <Route path="/view-users" element={<ViewUsersPage />} />
      <Route path="/update-profile" element={<UpdateProfilePage/>} />
      <Route path="/update-car/:carId" element={<UpdateCarPage/>} />
      <Route path="/create-ride/:carId" element={<CreateRidePage/>} />
      <Route path="/update-ride/:id" element={<UpdateRidePage/>} />
      <Route path="rides" element={<RidesPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
      <Route path="/verify-email" element={<VerifyEmailPage/>}/>
        <Route path="/view-rides" element={<AdminRidePage />} />
      <Route path="/admin" element={<AdminNavbar />}>
        <Route path="view-users" element={<ViewUsersPage />} />
        <Route path="view-rides" element={<AdminRidePage />} />
      </Route>
      <Route path="/user" element={<UserNavbar />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="your-cars" element={<YourCarsPage />} />
        <Route path="add-car" element={<AddCarPage />} />
        <Route path="your-rides" element={<YourRidesPage />} />
        <Route path="prev-rides" element={<PrevRidesPage />} />
      </Route>
    </Routes>
    <Toaster/>
    </>
  );
};

export default App;
