import { useState, useEffect } from 'react';
import { shippingConfig as defaultConfig } from '@/config/shipping';

const STORAGE_KEY = 'shipping_config';

export const useShippingConfig = () => {
  const [config, setConfig] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateRegion = (region: 'usEu' | 'international', method: 'standard' | 'express', updates: { cost?: number; days?: number }) => {
    setConfig((prev: typeof defaultConfig) => ({
      ...prev,
      regions: {
        ...prev.regions,
        [region]: {
          ...prev.regions[region],
          [method]: {
            ...prev.regions[region][method],
            ...updates
          }
        }
      }
    }));
  };

  const resetToDefaults = () => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { config, updateRegion, resetToDefaults };
};

export const getStoredShippingConfig = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultConfig;
};
