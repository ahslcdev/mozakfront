import toast, { type ToastOptions } from "react-hot-toast";

const defaultConfig: ToastOptions = {
  duration: 7000,
  position: "bottom-center",
  style: {
    fontSize: "14px",
    textAlign: "center",
  },
};

const ToastUtils = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { ...defaultConfig, ...options }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { ...defaultConfig, ...options }),

  info: (message: string, options?: ToastOptions) =>
    toast(message, { ...defaultConfig, icon: "ℹ️", ...options }),

  custom: (message: string, options?: ToastOptions) =>
    toast(message, { ...defaultConfig, ...options }),
};

export default ToastUtils;
