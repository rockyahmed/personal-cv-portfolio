"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import {
  Check,
  Moon,
  PanelLeft,
  PanelRight,
  RotateCcw,
  Settings,
  Sun,
  XMark,
} from "./Icons";

export type ThemeMode = "light" | "dark";
export type WidgetPosition = "right" | "left";
export type AccentPreset = "default" | "ocean" | "sunset" | "cyber";

interface AccentOption {
  id: AccentPreset;
  label: string;
  colors: [string, string, string];
}

const ACCENT_OPTIONS: AccentOption[] = [
  {
    id: "default",
    label: "Emerald & Violet",
    colors: ["#10b981", "#8b5cf6", "#ec4899"],
  },
  {
    id: "ocean",
    label: "Ocean Cyan",
    colors: ["#06b6d4", "#3b82f6", "#a855f7"],
  },
  {
    id: "sunset",
    label: "Sunset Glow",
    colors: ["#f59e0b", "#f97316", "#ef4444"],
  },
  {
    id: "cyber",
    label: "Cyber Neon",
    colors: ["#ec4899", "#a855f7", "#06b6d4"],
  },
];

const subscribeCustom = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-settings-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio-settings-change", callback);
  };
};

const emptySubscribe = () => () => {};

export default function SettingsWidget() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const theme = useSyncExternalStore(
    subscribeCustom,
    () => {
      try {
        return (localStorage.getItem("portfolio-theme") as ThemeMode) || "light";
      } catch {
        return "light";
      }
    },
    () => "light" as ThemeMode,
  );

  const position = useSyncExternalStore(
    subscribeCustom,
    () => {
      try {
        return (localStorage.getItem("portfolio-widget-pos") as WidgetPosition) || "right";
      } catch {
        return "right";
      }
    },
    () => "right" as WidgetPosition,
  );

  const accent = useSyncExternalStore(
    subscribeCustom,
    () => {
      try {
        return (localStorage.getItem("portfolio-accent") as AccentPreset) || "default";
      } catch {
        return "default";
      }
    },
    () => "default" as AccentPreset,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setNotification(msg);
    const t = setTimeout(() => setNotification(null), 2400);
    return () => clearTimeout(t);
  }, []);

  // Update theme
  const applyTheme = (newTheme: ThemeMode) => {
    try {
      localStorage.setItem("portfolio-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      window.dispatchEvent(new Event("portfolio-settings-change"));

      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          "content",
          newTheme === "light" ? "#f5f7fa" : "#090a12",
        );
      }
      showToast(`Switched to ${newTheme === "light" ? "Light (Default)" : "Dark"} mode`);
    } catch {
      // ignore
    }
  };

  // Update position
  const applyPosition = (newPos: WidgetPosition) => {
    try {
      localStorage.setItem("portfolio-widget-pos", newPos);
      document.documentElement.setAttribute("data-widget-pos", newPos);
      window.dispatchEvent(new Event("portfolio-settings-change"));
      showToast(`Widget docked to the ${newPos} side`);
    } catch {
      // ignore
    }
  };

  // Update accent
  const applyAccent = (newAccent: AccentPreset) => {
    try {
      localStorage.setItem("portfolio-accent", newAccent);
      document.documentElement.setAttribute("data-accent", newAccent);
      window.dispatchEvent(new Event("portfolio-settings-change"));
      const selected = ACCENT_OPTIONS.find((a) => a.id === newAccent)?.label || "Default";
      showToast(`Accent set to ${selected}`);
    } catch {
      // ignore
    }
  };

  // Reset to default
  const handleReset = () => {
    applyTheme("light");
    applyPosition("right");
    applyAccent("default");
    showToast("Preferences reset to defaults");
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Lock body scroll when panel is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Toast Notification */}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className={`settings-toast ${position === "left" ? "toast-left" : "toast-right"}`}
        >
          <span>{notification}</span>
        </div>
      )}

      {/* Floating Widget Trigger Button */}
      <aside
        aria-label="Site appearance controls"
        className={`settings-widget-dock ${position === "left" ? "dock-left" : "dock-right"}`}
      >
        <button
          id="settings-widget-trigger"
          type="button"
          className="settings-trigger-btn"
          aria-label="Open appearance and theme settings"
          aria-expanded={isOpen}
          aria-controls="settings-panel"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="trigger-icon-wrap">
            <Settings className="settings-gear-icon" />
          </span>

          <span className="trigger-badge">
            {isMounted && theme === "dark" ? (
              <Moon className="badge-theme-icon" />
            ) : (
              <Sun className="badge-theme-icon" />
            )}
          </span>

          <span className="trigger-tooltip">Settings</span>
        </button>
      </aside>

      {/* Backdrop */}
      {isOpen && (
        <div
          id="settings-backdrop"
          className="settings-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Settings Drawer Panel */}
      <section
        id="settings-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        className={`settings-panel ${position === "left" ? "panel-left" : "panel-right"} ${
          isOpen ? "is-open" : ""
        }`}
      >
        {/* Panel Header */}
        <div className="settings-header">
          <div className="settings-header-info">
            <div className="settings-badge-icon">
              <Settings />
            </div>
            <div>
              <h2 id="settings-title" className="settings-title">
                Appearance
              </h2>
              <p className="settings-subtitle">Customize theme &amp; layout</p>
            </div>
          </div>

          <button
            id="settings-close-btn"
            type="button"
            className="settings-close-btn"
            aria-label="Close appearance settings"
            onClick={() => setIsOpen(false)}
          >
            <XMark />
          </button>
        </div>

        {/* Panel Body */}
        <div className="settings-body">
          {/* Section 1: Light / Dark Mode Toggle */}
          <div className="settings-group">
            <div className="settings-group-header">
              <span className="group-eyebrow">Theme Mode</span>
              <span className="group-status">
                {theme === "light" ? "Default: Light" : "Dark Mode"}
              </span>
            </div>

            {/* Visual Choice Cards */}
            <div className="theme-cards-grid">
              {/* Light Option (Default) */}
              <button
                type="button"
                id="theme-opt-light"
                className={`theme-card ${theme === "light" ? "is-active" : ""}`}
                onClick={() => applyTheme("light")}
              >
                <div className="theme-preview-card preview-light">
                  <div className="preview-top">
                    <span className="preview-dot" />
                    <span className="preview-dot" />
                    <span className="preview-dot" />
                  </div>
                  <div className="preview-content">
                    <div className="preview-line" />
                    <div className="preview-line short" />
                  </div>
                  <Sun className="preview-icon light-icon" />
                </div>
                <div className="theme-card-meta">
                  <div className="meta-name-row">
                    <span className="theme-card-name">Light</span>
                    <span className="default-tag">Default</span>
                  </div>
                  <span className="theme-card-desc">Crisp &amp; clean</span>
                </div>
                {theme === "light" && (
                  <span className="check-indicator">
                    <Check />
                  </span>
                )}
              </button>

              {/* Dark Option */}
              <button
                type="button"
                id="theme-opt-dark"
                className={`theme-card ${theme === "dark" ? "is-active" : ""}`}
                onClick={() => applyTheme("dark")}
              >
                <div className="theme-preview-card preview-dark">
                  <div className="preview-top">
                    <span className="preview-dot" />
                    <span className="preview-dot" />
                    <span className="preview-dot" />
                  </div>
                  <div className="preview-content">
                    <div className="preview-line" />
                    <div className="preview-line short" />
                  </div>
                  <Moon className="preview-icon dark-icon" />
                </div>
                <div className="theme-card-meta">
                  <div className="meta-name-row">
                    <span className="theme-card-name">Dark</span>
                  </div>
                  <span className="theme-card-desc">Sleek &amp; ambient</span>
                </div>
                {theme === "dark" && (
                  <span className="check-indicator">
                    <Check />
                  </span>
                )}
              </button>
            </div>

            {/* Quick Toggle Switch */}
            <div className="quick-switch-bar">
              <button
                type="button"
                id="quick-toggle-light"
                className={`quick-switch-btn ${theme === "light" ? "active" : ""}`}
                onClick={() => applyTheme("light")}
              >
                <Sun /> Light Mode
              </button>
              <button
                type="button"
                id="quick-toggle-dark"
                className={`quick-switch-btn ${theme === "dark" ? "active" : ""}`}
                onClick={() => applyTheme("dark")}
              >
                <Moon /> Dark Mode
              </button>
            </div>
          </div>

          {/* Section 2: Widget Dock Side (Left or Right) */}
          <div className="settings-group">
            <div className="settings-group-header">
              <span className="group-eyebrow">Widget Position</span>
              <span className="group-status">
                Fixed {position === "right" ? "Right" : "Left"}
              </span>
            </div>
            <p className="group-description">
              Choose which screen side to fix the settings widget.
            </p>

            <div className="dock-position-grid">
              <button
                type="button"
                id="dock-pos-left"
                className={`dock-option-btn ${position === "left" ? "is-active" : ""}`}
                onClick={() => applyPosition("left")}
              >
                <PanelLeft className="dock-icon" />
                <div className="dock-meta">
                  <span className="dock-name">Left Side</span>
                  <small className="dock-hint">Docked to left edge</small>
                </div>
                {position === "left" && (
                  <span className="check-indicator-mini">
                    <Check />
                  </span>
                )}
              </button>

              <button
                type="button"
                id="dock-pos-right"
                className={`dock-option-btn ${position === "right" ? "is-active" : ""}`}
                onClick={() => applyPosition("right")}
              >
                <PanelRight className="dock-icon" />
                <div className="dock-meta">
                  <span className="dock-name">Right Side</span>
                  <small className="dock-hint">Default position</small>
                </div>
                {position === "right" && (
                  <span className="check-indicator-mini">
                    <Check />
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Section 3: Accent Color Presets */}
          <div className="settings-group">
            <div className="settings-group-header">
              <span className="group-eyebrow">Accent Palette</span>
              <span className="group-status">
                {ACCENT_OPTIONS.find((a) => a.id === accent)?.label}
              </span>
            </div>
            <p className="group-description">
              Select your favorite vibrant gradient tones.
            </p>

            <div className="accents-grid">
              {ACCENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  id={`accent-opt-${opt.id}`}
                  className={`accent-btn ${accent === opt.id ? "is-active" : ""}`}
                  onClick={() => applyAccent(opt.id)}
                  aria-label={opt.label}
                  title={opt.label}
                >
                  <span
                    className="accent-swatch"
                    style={{
                      background: `linear-gradient(135deg, ${opt.colors[0]} 0%, ${opt.colors[1]} 55%, ${opt.colors[2]} 100%)`,
                    }}
                  >
                    {accent === opt.id && <Check className="accent-check" />}
                  </span>
                  <span className="accent-label">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="settings-footer">
          <button
            type="button"
            id="settings-reset-btn"
            className="settings-reset-btn"
            onClick={handleReset}
          >
            <RotateCcw />
            <span>Reset to Defaults</span>
          </button>
          <p className="settings-persist-note">
            Preferences are saved automatically in your browser.
          </p>
        </div>
      </section>
    </>
  );
}
