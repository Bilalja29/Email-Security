import { create } from "zustand"
import { type Email, type Alert, mockEmails, mockAlerts } from "./mock-data"

interface AppState {
  emails: Email[]
  alerts: Alert[]
  isAuthenticated: boolean
  imapConfig: {
    host: string
    port: number
    email: string
    password: string
  } | null

  // Actions
  setEmails: (emails: Email[]) => void
  addEmail: (email: Email) => void
  markAsRead: (id: string) => void
  quarantineEmail: (id: string) => void
  restoreEmail: (id: string) => void
  deleteEmail: (id: string) => void
  addAlert: (alert: Alert) => void
  clearAlerts: () => void
  login: (config: { host: string; port: number; email: string; password: string }) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  emails: mockEmails,
  alerts: mockAlerts,
  isAuthenticated: false,
  imapConfig: null,

  setEmails: (emails) => set({ emails }),

  addEmail: (email) => set((state) => ({ emails: [email, ...state.emails] })),

  markAsRead: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, isRead: true } : e)),
    })),

  quarantineEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, isQuarantined: true } : e)),
    })),

  restoreEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((e) => (e.id === id ? { ...e, isQuarantined: false } : e)),
    })),

  deleteEmail: (id) =>
    set((state) => ({
      emails: state.emails.filter((e) => e.id !== id),
    })),

  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),

  clearAlerts: () => set({ alerts: [] }),

  login: (config) => set({ isAuthenticated: true, imapConfig: config }),

  logout: () => set({ isAuthenticated: false, imapConfig: null }),
}))
