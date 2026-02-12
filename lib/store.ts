import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Email, Alert } from '../types';

interface AppState {
  emails: Email[];
  alerts: Alert[];
  activeImapConfigId: string | null;
  setEmails: (emails: Email[]) => void;
  addAlert: (alert: Alert) => void;
  clearAlerts: () => void;
  setActiveImapConfig: (id: string) => void;
  markEmailRead: (id: string) => void;
  markAsRead: (id: string) => void;
  quarantineEmail: (id: string) => void;
  restoreEmail: (id: string) => void;
  deleteEmail: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    emails: [],
    alerts: [],
    activeImapConfigId: null,
    setEmails: (emails) => set({ emails }),
    addAlert: (alert) => set((state) => { state.alerts.push(alert); }),
    clearAlerts: () => set({ alerts: [] }),
    setActiveImapConfig: (id) => set({ activeImapConfigId: id }),
    markEmailRead: (id) => set((state) => {
      const email = state.emails.find((e) => e.id === id);
      if (email) email.isRead = true;
    }),
    markAsRead: (id) => set((state) => {
      const email = state.emails.find((e) => e.id === id);
      if (email) email.isRead = true;
    }),
    quarantineEmail: (id) => set((state) => {
      const email = state.emails.find((e) => e.id === id);
      if (email) email.isQuarantined = true;
    }),
    restoreEmail: (id) => set((state) => {
      const email = state.emails.find((e) => e.id === id);
      if (email) email.isQuarantined = false;
    }),
    deleteEmail: (id) => set((state) => {
      state.emails = state.emails.filter((e) => e.id !== id);
    }),
  }))
);
