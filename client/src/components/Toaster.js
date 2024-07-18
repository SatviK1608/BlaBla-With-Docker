import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message, type = 'info') => {
  toast(message, { type });
};

export const Toaster = () => <ToastContainer />;