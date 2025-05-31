"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

type ToastContextType = {
  showToast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

const STACK_LIMIT = 3;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => {
      const next = [...prev, { id, message, type }];
      return next.slice(-STACK_LIMIT);
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="top-4 right-4 z-50 fixed space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow animate-fade-in-up transition-opacity flex flex-row gap-3 justify-between w-75`}
          >
            <div>
              {toast.type == "success" ? (
                <CheckCircleIcon className="size-6 text-green-600" />
              ) : toast.type == "error" ? (
                <ExclamationCircleIcon className="size-6 text-red-600" />
              ) : null}
            </div>
            {toast.message}
            <div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Dismiss"
              >
                <XMarkIcon className="size-6 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
