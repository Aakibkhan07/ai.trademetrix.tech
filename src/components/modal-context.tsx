'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ModalType = 'auth' | 'demo' | 'consent' | null;

interface User {
  name?: string;
  email?: string;
  broker?: string;
}

interface ModalContextType {
  activeModal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  user: User | null;
  setUser: (user: User | null) => void;
  pendingPayment: { amount: number; plan: string } | null;
  setPendingPayment: (payment: { amount: number; plan: string } | null) => void;
}

const ModalContext = createContext<ModalContextType>({
  activeModal: null,
  openModal: () => {},
  closeModal: () => {},
  authMode: 'login',
  setAuthMode: () => {},
  user: null,
  setUser: () => {},
  pendingPayment: null,
  setPendingPayment: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [user, setUser] = useState<User | null>(null);
  const [pendingPayment, setPendingPayment] = useState<{ amount: number; plan: string } | null>(null);

  const openModal = useCallback((type: ModalType) => setActiveModal(type), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  return (
    <ModalContext.Provider
      value={{
        activeModal, openModal, closeModal,
        authMode, setAuthMode,
        user, setUser,
        pendingPayment, setPendingPayment,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
