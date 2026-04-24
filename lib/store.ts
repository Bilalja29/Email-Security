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
  login: (id: string) => void;
  logout: () => void;
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
    // Login by setting active IMAP config id (accepts id string)
    login: (id: string) => set({ activeImapConfigId: id }),
    // Logout clears session-related state
    logout: () => set({ activeImapConfigId: null, emails: [], alerts: [] }),
  }))
);
