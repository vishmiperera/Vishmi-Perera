import React, { createContext, useContext, useState, useEffect } from 'react';
import * as defaultData from '../data/portfolioData';
import { themePresets, applyThemeColors } from '../data/themePresets';
import {
  getStoredCredentials,
  saveStoredCredentials,
  clearStoredCredentials,
  getSupabaseClient,
  testSupabaseConnection,
  fetchPortfolioFromSupabase,
  savePortfolioToSupabase
} from '../lib/supabase';

const PortfolioContext = createContext();

const STORAGE_KEY = 'vishmi_portfolio_data';
const AUTH_KEY = 'vishmi_admin_auth';

export function PortfolioProvider({ children }) {
  // Initialize portfolio data
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          personalInfo: { ...defaultData.personalInfo, ...(parsed.personalInfo || {}) },
          contactSection: { ...defaultData.contactSection, ...(parsed.contactSection || {}) },
          internationalExposure: parsed.internationalExposure || defaultData.internationalExposure,
          coreExpertise: parsed.coreExpertise || defaultData.coreExpertise,
          commercialResults: { ...defaultData.commercialResults, ...(parsed.commercialResults || {}) },
          awardsList: parsed.awardsList || defaultData.awardsList,
          workExperience: parsed.workExperience || defaultData.workExperience,
          additionalExperience: parsed.additionalExperience || defaultData.additionalExperience,
          toolsList: parsed.toolsList || defaultData.toolsList,
          educationList: parsed.educationList || defaultData.educationList,
          faqs: parsed.faqs || defaultData.faqs,
          heroImage: parsed.heroImage || '/images/vishmi-perera.jpg',
          activeThemeId: parsed.activeThemeId || 'warm-orange',
          customThemeColors: parsed.customThemeColors || null
        };
      }
    } catch (e) {
      console.error('Failed to parse portfolio data from storage', e);
    }

    return {
      personalInfo: defaultData.personalInfo,
      internationalExposure: defaultData.internationalExposure,
      coreExpertise: defaultData.coreExpertise,
      commercialResults: defaultData.commercialResults,
      awardsList: defaultData.awardsList,
      workExperience: defaultData.workExperience,
      additionalExperience: defaultData.additionalExperience,
      toolsList: defaultData.toolsList,
      educationList: defaultData.educationList,
      contactSection: defaultData.contactSection,
      faqs: defaultData.faqs,
      heroImage: '/images/vishmi-perera.jpg',
      activeThemeId: 'warm-orange',
      customThemeColors: null
    };
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  // Supabase Sync States
  const [supabaseConfig, setSupabaseConfig] = useState(getStoredCredentials);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'saved' | 'error' | 'offline'
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  // Apply theme colors to CSS variables
  useEffect(() => {
    if (portfolioData.activeThemeId === 'custom' && portfolioData.customThemeColors) {
      applyThemeColors(portfolioData.customThemeColors);
    } else {
      const preset = themePresets.find(t => t.id === portfolioData.activeThemeId) || themePresets[0];
      applyThemeColors(preset);
    }
  }, [portfolioData.activeThemeId, portfolioData.customThemeColors]);

  // Initial cloud fetch from Supabase if credentials exist
  useEffect(() => {
    async function initCloudSync() {
      const client = getSupabaseClient();
      if (!client) {
        setSyncStatus('offline');
        return;
      }

      setSyncStatus('syncing');
      try {
        const remoteData = await fetchPortfolioFromSupabase();
        if (remoteData && remoteData.content) {
          const merged = {
            ...remoteData.content,
            personalInfo: {
              ...defaultData.personalInfo,
              ...(remoteData.content.personalInfo || {})
            },
            commercialResults: {
              ...defaultData.commercialResults,
              ...(remoteData.content.commercialResults || {})
            },
            contactSection: {
              ...defaultData.contactSection,
              ...(remoteData.content.contactSection || {})
            }
          };
          setPortfolioData(merged);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch (storageErr) {
            console.warn('Storage quota warning', storageErr);
          }
          setIsSupabaseConnected(true);
          setSyncStatus('saved');
          setLastSyncedAt(remoteData.updatedAt || new Date().toISOString());
        } else {
          // Connected, but no record exists yet. Upload current local data to Supabase
          const saveRes = await savePortfolioToSupabase(portfolioData);
          if (saveRes.success) {
            setIsSupabaseConnected(true);
            setSyncStatus('saved');
            setLastSyncedAt(new Date().toISOString());
          }
        }
      } catch (err) {
        console.warn('Initial cloud sync error', err);
        setSyncStatus('offline');
      }
    }

    initCloudSync();
  }, []);

  // Save portfolio data locally and to Supabase
  const savePortfolioData = async (newData) => {
    setPortfolioData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    // Attempt Supabase push if configured
    const client = getSupabaseClient();
    if (client) {
      setSyncStatus('syncing');
      const res = await savePortfolioToSupabase(newData);
      if (res.success) {
        setIsSupabaseConnected(true);
        setSyncStatus('saved');
        setLastSyncedAt(new Date().toISOString());
      } else {
        setSyncStatus('error');
      }
    }
  };

  const updateSection = (sectionName, newValues) => {
    const updated = {
      ...portfolioData,
      [sectionName]: newValues
    };
    savePortfolioData(updated);
  };

  // Change active color theme
  const setThemePreset = (themeId) => {
    const updated = {
      ...portfolioData,
      activeThemeId: themeId,
      customThemeColors: null
    };
    savePortfolioData(updated);
  };

  const setCustomColors = (colors) => {
    const updated = {
      ...portfolioData,
      activeThemeId: 'custom',
      customThemeColors: colors
    };
    savePortfolioData(updated);
  };

  // Connect to Supabase
  const connectSupabase = async (url, anonKey) => {
    setSyncStatus('syncing');
    const testResult = await testSupabaseConnection(url, anonKey);
    if (testResult.success) {
      saveStoredCredentials(url, anonKey);
      setSupabaseConfig({ url, anonKey });
      setIsSupabaseConnected(true);

      // Attempt to save current state to Supabase
      await savePortfolioToSupabase(portfolioData);
      setSyncStatus('saved');
      setLastSyncedAt(new Date().toISOString());
      return { success: true };
    } else {
      setSyncStatus('error');
      return { success: false, error: testResult.error };
    }
  };

  const disconnectSupabase = () => {
    clearStoredCredentials();
    setSupabaseConfig({ url: '', anonKey: '' });
    setIsSupabaseConnected(false);
    setSyncStatus('offline');
  };

  const manualSyncFromSupabase = async () => {
    setSyncStatus('syncing');
    const remote = await fetchPortfolioFromSupabase();
    if (remote && remote.content) {
      setPortfolioData(remote.content);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remote.content));
      setSyncStatus('saved');
      setLastSyncedAt(remote.updatedAt || new Date().toISOString());
      return true;
    }
    setSyncStatus('error');
    return false;
  };

  const resetToDefaults = () => {
    const defaults = {
      personalInfo: defaultData.personalInfo,
      internationalExposure: defaultData.internationalExposure,
      coreExpertise: defaultData.coreExpertise,
      commercialResults: defaultData.commercialResults,
      awardsList: defaultData.awardsList,
      workExperience: defaultData.workExperience,
      additionalExperience: defaultData.additionalExperience,
      toolsList: defaultData.toolsList,
      educationList: defaultData.educationList,
      contactSection: defaultData.contactSection,
      faqs: defaultData.faqs,
      heroImage: '/images/vishmi-perera.jpg',
      activeThemeId: 'warm-orange',
      customThemeColors: null
    };
    savePortfolioData(defaults);
    localStorage.removeItem(STORAGE_KEY);
  };

  const loginAdmin = (password) => {
    if (password === 'VPerera@97') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updateSection,
        savePortfolioData,
        resetToDefaults,
        setThemePreset,
        setCustomColors,
        themePresets,
        // Supabase Cloud Sync
        supabaseConfig,
        connectSupabase,
        disconnectSupabase,
        manualSyncFromSupabase,
        isSupabaseConnected,
        syncStatus,
        lastSyncedAt,
        // Auth
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
