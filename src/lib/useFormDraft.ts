'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useFormDraft<T extends Record<string, any>>(
  storageKey: string,
  initialValues: T,
  options: {
    enabled?: boolean;
    onRestore?: (restoredData: T) => void;
  } = {}
) {
  const { enabled = true, onRestore } = options;
  const [data, setData] = useState<T>(initialValues);
  const [isRestored, setIsRestored] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const isHydrated = useRef(false);

  // Load draft from localStorage on client mount
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          // Check if at least one meaningful field has content
          const hasAnyContent = Object.entries(parsed).some(([key, val]) => {
            if (key === 'honeypot' || key === 'privacyConsent') return false;
            return typeof val === 'string' ? val.trim().length > 0 : Boolean(val);
          });

          if (hasAnyContent) {
            setData((prev) => ({ ...prev, ...parsed }));
            setIsRestored(true);
            setHasDraft(true);
            if (onRestore) onRestore(parsed);
          }
        }
      }
    } catch (e) {
      console.warn(`[useFormDraft] Failed to load draft for key "${storageKey}":`, e);
    } finally {
      isHydrated.current = true;
    }
  }, [storageKey, enabled]);

  // Save to localStorage on data change (after hydration)
  useEffect(() => {
    if (!enabled || !isHydrated.current || typeof window === 'undefined') return;

    try {
      // Don't save empty states
      const hasAnyContent = Object.entries(data).some(([key, val]) => {
        if (key === 'honeypot' || key === 'privacyConsent') return false;
        return typeof val === 'string' ? val.trim().length > 0 : Boolean(val);
      });

      if (hasAnyContent) {
        window.localStorage.setItem(storageKey, JSON.stringify(data));
        setHasDraft(true);
      }
    } catch (e) {
      console.warn(`[useFormDraft] Failed to save draft for key "${storageKey}":`, e);
    }
  }, [data, storageKey, enabled]);

  // Clear draft from localStorage
  const clearDraft = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(storageKey);
      setHasDraft(false);
      setIsRestored(false);
    } catch (e) {
      console.warn(`[useFormDraft] Failed to clear draft for key "${storageKey}":`, e);
    }
  }, [storageKey]);

  return {
    formData: data,
    setFormData: setData,
    isRestored,
    setIsRestored,
    hasDraft,
    clearDraft,
  };
}
