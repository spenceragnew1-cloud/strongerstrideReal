/// <reference types="vite/client" />

interface Window {
  dataLayer: any[];
  gtag: (command: string, targetId: string, config?: Record<string, any>) => void;
}
