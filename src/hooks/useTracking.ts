"use client";

import { useEffect, useRef, useCallback } from "react";

const ENABLE_TRACKING = process.env.NEXT_PUBLIC_ENABLE_TRACKING === "true";
const TEST_EVENT_CODE = process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE || "";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const STORAGE_KEY = "multipost_user_data";

interface TrackData {
  email?: string;
  phone?: string;
  name?: string;
  form_name?: string;
  form_id?: string;
}

interface StoredUserData {
  email: string;
  phone: string;
  name: string;
}

// --- User data persistence (localStorage) ---

function saveUserData(data: TrackData): void {
  if (!data.email && !data.phone && !data.name) return;

  try {
    const existing = loadUserData();
    const merged: StoredUserData = {
      email: data.email || existing.email,
      phone: data.phone || existing.phone,
      name: data.name || existing.name,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    updatePixelUserData(merged);
  } catch {
    // localStorage not available
  }
}

function loadUserData(): StoredUserData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // localStorage not available
  }
  return { email: "", phone: "", name: "" };
}

function mergeWithStored(data: TrackData): TrackData {
  const stored = loadUserData();
  return {
    ...data,
    email: data.email || stored.email,
    phone: data.phone || stored.phone,
    name: data.name || stored.name,
  };
}

// --- Pixel Advanced Matching ---

function splitName(fullName: string): { fn: string; ln: string } {
  const parts = fullName.trim().split(/\s+/);
  const fn = parts[0]?.toLowerCase() || "";
  const ln = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
  return { fn, ln };
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length <= 11 ? `55${digits}` : digits;
}

function updatePixelUserData(stored: StoredUserData): void {
  if (typeof window.fbq !== "function" || !PIXEL_ID) return;
  if (!stored.email && !stored.phone && !stored.name) return;

  const userData: Record<string, string> = {};
  if (stored.email) userData.em = stored.email.toLowerCase().trim();
  if (stored.phone) userData.ph = normalizePhone(stored.phone);
  if (stored.name) {
    const { fn, ln } = splitName(stored.name);
    if (fn) userData.fn = fn;
    if (ln) userData.ln = ln;
  }
  userData.country = "br";

  window.fbq(
    "init" as string,
    PIXEL_ID,
    userData as unknown as Record<string, unknown>
  );
}

// --- Cookie helpers ---

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getFbc(): string {
  const existing = getCookie("_fbc");
  if (existing) return existing;

  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    setCookie("_fbc", fbc, 90);
    return fbc;
  }

  return "";
}

function captureFbclid(): void {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (fbclid) {
    if (!getCookie("_fbc")) {
      const fbc = `fb.1.${Date.now()}.${fbclid}`;
      setCookie("_fbc", fbc, 90);
    }
  }
}

// --- Event firing ---

function fireServerEvent(
  eventName: string,
  eventId: string,
  data: TrackData
) {
  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    user_data: {
      email: data.email || "",
      phone: data.phone || "",
      fbp: getCookie("_fbp"),
      fbc: getFbc(),
      client_user_agent: navigator.userAgent,
      client_ip_address: "",
    },
    custom_data: {
      name: data.name || "",
      form_name: data.form_name || "",
      form_id: data.form_id || "",
    },
    test_event_code: TEST_EVENT_CODE,
  };

  fetch("/api/capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Fire and forget
  });
}

function fireBrowserPixel(
  eventName: string,
  eventId: string,
  data: TrackData
) {
  if (typeof window.fbq !== "function") return;

  const customData: Record<string, unknown> = {};
  if (data.form_name) customData.form_name = data.form_name;
  if (data.form_id) customData.form_id = data.form_id;

  window.fbq("track", eventName, customData, { eventID: eventId });
}

// --- Exported API ---

export type TrackFunction = (eventName: string, data?: TrackData) => void;

export function createTrackFunction(): TrackFunction {
  return (eventName: string, data: TrackData = {}) => {
    if (!ENABLE_TRACKING) return;

    if (data.email || data.phone || data.name) saveUserData(data);
    const enriched = mergeWithStored(data);

    const eventId = crypto.randomUUID();
    fireBrowserPixel(eventName, eventId, enriched);
    fireServerEvent(eventName, eventId, enriched);
  };
}

export function useTracking(): { track: TrackFunction } {
  const pageViewFired = useRef(false);
  const viewContentFired = useRef(false);

  const track: TrackFunction = useCallback(
    (eventName: string, data: TrackData = {}) => {
      if (!ENABLE_TRACKING) return;

      if (data.email || data.phone || data.name) saveUserData(data);
      const enriched = mergeWithStored(data);

      const eventId = crypto.randomUUID();
      fireBrowserPixel(eventName, eventId, enriched);
      fireServerEvent(eventName, eventId, enriched);
    },
    []
  );

  // On mount: capture fbclid + restore pixel Advanced Matching
  useEffect(() => {
    if (!ENABLE_TRACKING) return;

    captureFbclid();

    const stored = loadUserData();
    if (stored.email || stored.phone || stored.name) {
      updatePixelUserData(stored);
    }
  }, []);

  // Auto-fire PageView on mount (once)
  useEffect(() => {
    if (!ENABLE_TRACKING) return;
    if (pageViewFired.current) return;

    pageViewFired.current = true;
    track("PageView");
  }, [track]);

  // WhatsApp Contact click detection
  useEffect(() => {
    if (!ENABLE_TRACKING) return;

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        track("Contact");
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [track]);

  // AddToCart — checkout link click detection
  useEffect(() => {
    if (!ENABLE_TRACKING) return;

    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("pay.hotmart.com")) {
        track("AddToCart");
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [track]);

  // ViewContent — fires when user scrolls past hero section
  useEffect(() => {
    if (!ENABLE_TRACKING) return;

    const hero = document.querySelector('[data-section="hero"]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !viewContentFired.current) {
          viewContentFired.current = true;
          track("ViewContent");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [track]);

  return { track };
}
