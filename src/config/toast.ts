import type { ToastOptions, ToastContainerProps } from 'react-toastify';

// Global settings for ToastContainer
export const toastContainerConfig: ToastContainerProps = {
  position: 'bottom-left',
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'dark',
};

// Default Toast options
export const defaultToastOptions: ToastOptions = {
  position: 'bottom-left',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Settings for specific types of Toast
export const toastOptions = {
  error: {
    ...defaultToastOptions,
  } as ToastOptions,

  success: {
    ...defaultToastOptions,
  } as ToastOptions,

  warning: {
    ...defaultToastOptions,
    autoClose: 3000,
  } as ToastOptions,

  info: {
    ...defaultToastOptions,
    autoClose: 3000,
  } as ToastOptions,
};
