// Utility to poll alerts from the backend and update the store
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function useAlertPolling(interval = 5000) {
  const addAlert = useAppStore((s) => s.addAlert);
  const clearAlerts = useAppStore((s) => s.clearAlerts);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let lastAlertIds = new Set<string>();
    async function poll() {
      try {
        const res = await fetch('/api/alerts');
        const alerts = await res.json();
        // Only add new alerts
        for (const alert of alerts) {
          if (!lastAlertIds.has(alert.id)) {
            addAlert(alert);
            lastAlertIds.add(alert.id);
          }
        }
      } catch {}
      timer = setTimeout(poll, interval);
    }
    clearAlerts();
    poll();
    return () => clearTimeout(timer);
  }, [interval, addAlert, clearAlerts]);
}
