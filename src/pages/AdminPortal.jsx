import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  LogOut,
  User,
  Briefcase,
  TrendingUp,
  Award,
  Globe,
  Wrench,
  GraduationCap,
  Cloud,
  Palette,
  Check,
  RefreshCw,
  Copy,
  Image as ImageIcon,
  FileCode
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { themePresets } from '../data/themePresets';
import { SUPABASE_SQL_SCRIPT } from '../lib/supabase';

export default function AdminPortal() {
  const {
    portfolioData,
    savePortfolioData,
    resetToDefaults,
    setThemePreset,
    setCustomColors,
    // Supabase
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
  } = usePortfolio();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState('theme');

  // Local Form Working Copy
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(portfolioData)));
  const [saveToast, setSaveToast] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  // Supabase Form State
  const [supabaseUrl, setSupabaseUrl] = useState(supabaseConfig.url || '');
  const [supabaseKey, setSupabaseKey] = useState(supabaseConfig.anonKey || '');
  const [connectingSupabase, setConnectingSupabase] = useState(false);
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Custom Color State
  const [customHex, setCustomHex] = useState(
    formData.customThemeColors?.accent || '#F57C00'
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setFormData(JSON.parse(JSON.stringify(portfolioData)));
    }
  };

  const handleSave = () => {
    savePortfolioData(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 4000);
  };

  const handleResetConfirm = () => {
    resetToDefaults();
    setResetModal(false);
    window.location.reload();
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size exceeds 2MB. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, heroImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Supabase Connect Action
  const handleConnectSupabase = async (e) => {
    e.preventDefault();
    if (!supabaseUrl || !supabaseKey) {
      setSupabaseStatusMsg({ success: false, text: 'Please fill in both Supabase URL and Anon Key.' });
      return;
    }

    setConnectingSupabase(true);
    setSupabaseStatusMsg(null);

    const res = await connectSupabase(supabaseUrl, supabaseKey);
    setConnectingSupabase(false);

    if (res.success) {
      setSupabaseStatusMsg({ success: true, text: 'Connected to Supabase cloud! Portfolio data is now synchronized.' });
    } else {
      setSupabaseStatusMsg({ success: false, text: res.error });
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Custom Color Apply
  const handleApplyCustomColor = () => {
    // Generate simple hover and light tints from hex
    const customPalette = {
      accent: customHex,
      hover: customHex,
      light: `${customHex}25`, // 15% opacity hex
      glow: `${customHex}45`
    };
    setFormData({
      ...formData,
      activeThemeId: 'custom',
      customThemeColors: customPalette
    });
    setCustomColors(customPalette);
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vishmi-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          setFormData(imported);
          savePortfolioData(imported);
          alert('Portfolio data successfully imported and saved!');
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  // --------------------------------------------------------------------------
  // 1. Password Protected Login View
  // --------------------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="admin-login-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="admin-login-card"
        >
          <div className="login-icon-badge">
            <Lock size={28} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
            Portfolio Admin Portal
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Enter the owner authorization password to edit and customize all sections.
          </p>

          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="login-error-alert"
            >
              <AlertCircle size={18} />
              <span>Incorrect password. Please verify and try again.</span>
            </motion.div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Owner Password</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Required</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  style={{ paddingRight: '44px' }}
                  placeholder="Enter admin password..."
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="form-submit-btn" style={{ marginTop: '10px' }}>
              <KeyRound size={18} />
              <span>Unlock Admin Controls</span>
            </button>
          </form>

          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
            <Link to="/" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>← Return to Public Portfolio</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // 2. Full Admin Dashboard (Authenticated)
  // --------------------------------------------------------------------------
  const tabs = [
    { id: 'theme', label: 'Color Themes', icon: Palette },
    { id: 'supabase', label: 'Supabase Cloud Sync', icon: Cloud },
    { id: 'profile', label: 'Profile & Hero', icon: User },
    { id: 'services', label: 'Services (7)', icon: Briefcase },
    { id: 'results', label: 'Commercial Results', icon: TrendingUp },
    { id: 'experience', label: 'Work History', icon: Briefcase },
    { id: 'awards', label: 'Awards (5)', icon: Award },
    { id: 'international', label: 'Global Footprint', icon: Globe },
    { id: 'tools', label: 'Tools & Stack', icon: Wrench },
    { id: 'education', label: 'Education & FAQs', icon: GraduationCap }
  ];

  return (
    <div className="admin-portal-wrapper">
      {/* Save Toast Notification */}
      <AnimatePresence>
        {saveToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="toast-notice"
            style={{ zIndex: 999999 }}
          >
            <CheckCircle2 color="var(--accent-orange)" size={24} />
            <div>
              <strong>Changes Saved Successfully!</strong>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
                {isSupabaseConnected ? 'Synchronized to Supabase cloud database.' : 'Saved locally in browser.'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      {resetModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              Reset All Portfolio Data to Defaults?
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              This will erase all custom edits made in the admin portal and restore the original information for Vishmi Perera. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setResetModal(false)} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.9rem' }}>
                Cancel
              </button>
              <button onClick={handleResetConfirm} className="btn-primary" style={{ background: '#DC2626', padding: '8px 18px', fontSize: '0.9rem' }}>
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Top Navbar */}
      <div className="admin-top-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="brand-icon" style={{ width: '34px', height: '34px' }}>
              <Lock size={16} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                Portfolio Admin Portal
              </div>
              <div style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                {isSupabaseConnected ? (
                  <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    Supabase Cloud Connected
                  </span>
                ) : (
                  <span style={{ color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
                    Local Storage Mode (Connect Supabase below)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link to="/" target="_blank" className="admin-action-btn" title="Open live portfolio in new tab">
              <ExternalLink size={15} />
              <span>Preview Live Site</span>
            </Link>

            <button onClick={handleExportJSON} className="admin-action-btn" title="Download JSON backup">
              <FileCode size={15} />
              <span>Export Backup</span>
            </button>

            <label className="admin-action-btn" style={{ cursor: 'pointer', margin: 0 }} title="Upload JSON backup">
              <Upload size={15} />
              <span>Import Backup</span>
              <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
            </label>

            <button onClick={() => setResetModal(true)} className="admin-action-btn" style={{ color: '#DC2626' }} title="Reset data">
              <RotateCcw size={15} />
              <span>Reset Defaults</span>
            </button>

            <button onClick={logoutAdmin} className="admin-action-btn" style={{ color: 'var(--text-muted)' }}>
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="container" style={{ padding: '36px 24px 120px 24px' }}>
        
        {/* Navigation Tabs Bar */}
        <div className="admin-tabs-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`admin-tab-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab: Color Themes */}
        {activeTab === 'theme' && (
          <div className="admin-section-card">
            <h3 className="admin-card-heading">
              <Palette size={20} color="var(--accent-orange)" />
              <span>Portfolio Accent Color Themes</span>
            </h3>
            <p className="admin-card-sub">
              Choose from 7 expertly crafted professional presets, or choose a custom brand accent color. This immediately updates buttons, badges, highlights, and borders across the entire portfolio.
            </p>

            {/* Presets Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {themePresets.map((preset) => {
                const isSelected = formData.activeThemeId === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        activeThemeId: preset.id,
                        customThemeColors: null
                      });
                      setThemePreset(preset.id);
                    }}
                    style={{
                      background: 'var(--bg-primary)',
                      border: isSelected ? `2px solid ${preset.colors.accent}` : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: preset.colors.accent,
                            boxShadow: `0 2px 8px ${preset.colors.glow}`
                          }}
                        />
                        <span style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                          {preset.name}
                        </span>
                      </div>
                      {isSelected && (
                        <div
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: preset.colors.accent,
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem'
                          }}
                        >
                          <Check size={14} />
                        </div>
                      )}
                    </div>

                    <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.45 }}>
                      {preset.description}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-pill)',
                          background: preset.colors.light,
                          color: preset.colors.accent
                        }}
                      >
                        Sample Badge
                      </span>

                      <button
                        type="button"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 12px',
                          borderRadius: 'var(--radius-pill)',
                          background: preset.colors.accent,
                          color: '#FFFFFF'
                        }}
                      >
                        Action
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Color Picker Box */}
            <div style={{ padding: '24px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-main)' }}>
                Or Pick a Custom Hex Color:
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Select any custom hex color code. Tints and glow reflections will be calculated automatically.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  style={{ width: '48px', height: '48px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'none' }}
                />

                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value)}
                  className="form-control"
                  style={{ width: '130px', fontWeight: 700, fontFamily: 'monospace' }}
                  placeholder="#F57C00"
                />

                <button
                  type="button"
                  onClick={handleApplyCustomColor}
                  className="btn-primary"
                  style={{ padding: '10px 20px', fontSize: '0.9rem' }}
                >
                  Apply Custom Color
                </button>

                {formData.activeThemeId === 'custom' && (
                  <span style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: 700 }}>
                    ✓ Custom Color Active
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Supabase Cloud Database Sync */}
        {activeTab === 'supabase' && (
          <div className="admin-section-card">
            <h3 className="admin-card-heading">
              <Cloud size={20} color="var(--accent-orange)" />
              <span>Supabase Cloud Database Synchronization</span>
            </h3>
            <p className="admin-card-sub">
              Sync all portfolio customizations to a real cloud PostgreSQL database so changes appear live for visitors worldwide across any device.
            </p>

            {/* Connection Status Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                background: isSupabaseConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                border: isSupabaseConnected ? '1px solid #10B981' : '1px solid #F59E0B',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isSupabaseConnected ? '#10B981' : '#F59E0B'
                  }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {isSupabaseConnected ? 'Supabase Database Connected & In Sync' : 'Local Storage Fallback Active'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {lastSyncedAt ? `Last cloud sync: ${new Date(lastSyncedAt).toLocaleTimeString()}` : 'Not yet synced with remote database.'}
                  </div>
                </div>
              </div>

              {isSupabaseConnected && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={manualSyncFromSupabase}
                    className="admin-action-btn"
                    title="Pull remote data from Supabase"
                  >
                    <RefreshCw size={14} />
                    <span>Pull from Cloud</span>
                  </button>

                  <button
                    type="button"
                    onClick={disconnectSupabase}
                    className="admin-action-btn"
                    style={{ color: '#DC2626' }}
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>

            {/* Setup Instructions Walkthrough */}
            <div style={{ background: 'var(--bg-primary)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginBottom: '28px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text-main)' }}>
                How to Connect Your Supabase Project (3 Simple Steps):
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                <div>
                  <strong>Step 1:</strong> Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-orange)', textDecoration: 'underline' }}>supabase.com</a>, log in and create a new free project.
                </div>

                <div>
                  <strong>Step 2:</strong> In your Supabase Dashboard, click <strong>SQL Editor</strong> on the left, paste the SQL script below, and click <strong>Run</strong>:
                  <div style={{ position: 'relative', marginTop: '8px' }}>
                    <pre
                      style={{
                        background: 'var(--dark-primary)',
                        color: '#FFFFFF',
                        padding: '16px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8rem',
                        overflowX: 'auto',
                        maxHeight: '160px'
                      }}
                    >
                      {SUPABASE_SQL_SCRIPT}
                    </pre>
                    <button
                      type="button"
                      onClick={handleCopySql}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.15)',
                        color: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {copiedSql ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <strong>Step 3:</strong> In Supabase, go to <strong>Project Settings → API</strong>. Copy your <strong>Project URL</strong> and <strong>anon / public Key</strong>, paste them below, and click Connect!
                </div>
              </div>
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleConnectSupabase}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Supabase Project URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://yourproject.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Supabase Anon Public API Key</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    required
                  />
                </div>
              </div>

              {supabaseStatusMsg && (
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '16px',
                    fontSize: '0.88rem',
                    background: supabaseStatusMsg.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(220, 38, 38, 0.15)',
                    color: supabaseStatusMsg.success ? '#059669' : '#DC2626'
                  }}
                >
                  {supabaseStatusMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={connectingSupabase}
                className="btn-primary"
                style={{ padding: '12px 28px' }}
              >
                <Cloud size={18} />
                <span>{connectingSupabase ? 'Testing Connection...' : 'Connect & Sync with Supabase'}</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 1: Profile & Hero */}
        {activeTab === 'profile' && (
          <div className="admin-section-card">
            <h3 className="admin-card-heading">
              <User size={20} color="var(--accent-orange)" />
              <span>Personal Identity & Hero Configuration</span>
            </h3>
            <p className="admin-card-sub">
              Manage primary headline, role, contact channels, bio copy, and hero portrait.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personalInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, name: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Hero Badge Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personalInfo.role}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, role: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Headline</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personalInfo.headline}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, headline: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personalInfo.location}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, location: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, email: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personalInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, phone: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.personalInfo.whatsapp}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, whatsapp: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">LinkedIn Profile URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.personalInfo.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, linkedin: e.target.value }
                  })}
                />
              </div>
            </div>

            {/* Profile Image Uploader & Live Preview */}
            <div style={{ marginTop: '24px', padding: '20px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <label className="form-label" style={{ fontSize: '1rem', marginBottom: '10px' }}>
                <ImageIcon size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Profile Portrait Image
              </label>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ width: '90px', height: '110px', borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--accent-orange)' }}>
                  <img src={formData.heroImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, minWidth: '240px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    Upload a new photo from your computer (auto-converted to storage) or type an image URL.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <label className="btn-primary" style={{ padding: '9px 18px', fontSize: '0.88rem', cursor: 'pointer' }}>
                      <Upload size={15} />
                      <span>Upload New Photo</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, heroImage: '/images/vishmi-perera.jpg' })}
                      className="btn-secondary"
                      style={{ padding: '9px 18px', fontSize: '0.88rem' }}
                    >
                      Reset to Default Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography Copy */}
            <div style={{ marginTop: '24px' }}>
              <div className="form-group">
                <label className="form-label">Main Bio (Introductory Paragraph)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={formData.personalInfo.mainIntro}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, mainIntro: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Bio (International Exposure & Cross-Border Summary)</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={formData.personalInfo.detailedIntro}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, detailedIntro: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Services & Core Expertise */}
        {activeTab === 'services' && (
          <div className="admin-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="admin-card-heading">
                  <Briefcase size={20} color="var(--accent-orange)" />
                  <span>Core Expertise & Services ({formData.coreExpertise.length})</span>
                </h3>
                <p className="admin-card-sub">
                  Customize the services displayed in the interactive accordion and dedicated services page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newId = String(formData.coreExpertise.length + 1).padStart(2, '0');
                  const newService = {
                    id: newId,
                    title: 'New Commercial Capability',
                    shortDesc: 'Short description of this capability and client outcome.',
                    fullDesc: 'Comprehensive description explaining methodology, execution, and value delivered to B2B clients.',
                    tags: ['Strategy', 'Execution', 'Growth'],
                    deliverables: ['Custom Deliverable 1', 'Custom Deliverable 2']
                  };
                  setFormData({
                    ...formData,
                    coreExpertise: [...formData.coreExpertise, newService]
                  });
                }}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <Plus size={15} />
                <span>Add New Service</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {formData.coreExpertise.map((service, index) => (
                <div key={index} className="admin-item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                      #{service.id} Capability
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.coreExpertise.filter((_, i) => i !== index);
                        setFormData({ ...formData, coreExpertise: updated });
                      }}
                      className="admin-delete-btn"
                      title="Delete Service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Service Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={service.title}
                        onChange={(e) => {
                          const updated = [...formData.coreExpertise];
                          updated[index].title = e.target.value;
                          setFormData({ ...formData, coreExpertise: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tags (comma-separated)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={service.tags.join(', ')}
                        onChange={(e) => {
                          const updated = [...formData.coreExpertise];
                          updated[index].tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setFormData({ ...formData, coreExpertise: updated });
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Short Summary (Accordion Subtitle)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={service.shortDesc}
                      onChange={(e) => {
                        const updated = [...formData.coreExpertise];
                        updated[index].shortDesc = e.target.value;
                        setFormData({ ...formData, coreExpertise: updated });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Description</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={service.fullDesc}
                      onChange={(e) => {
                        const updated = [...formData.coreExpertise];
                        updated[index].fullDesc = e.target.value;
                        setFormData({ ...formData, coreExpertise: updated });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Commercial Results */}
        {activeTab === 'results' && (
          <div className="admin-section-card">
            <h3 className="admin-card-heading">
              <TrendingUp size={20} color="var(--accent-orange)" />
              <span>Commercial Results & Impact Metrics</span>
            </h3>
            <p className="admin-card-sub">
              Customize the MillionSpaces (or client company) growth metrics and collaborative team attribution note.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div className="form-group">
                <label className="form-label">Company / Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.commercialResults.company}
                  onChange={(e) => setFormData({
                    ...formData,
                    commercialResults: { ...formData.commercialResults, company: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Measurement Period</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.commercialResults.period}
                  onChange={(e) => setFormData({
                    ...formData,
                    commercialResults: { ...formData.commercialResults, period: e.target.value }
                  })}
                />
              </div>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text-main)' }}>
              Metric Cards (3 Primary Highlights):
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {formData.commercialResults.metrics.map((metric, index) => (
                <div key={index} className="admin-item-card">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Metric Label</label>
                      <input
                        type="text"
                        className="form-control"
                        value={metric.label}
                        onChange={(e) => {
                          const updated = [...formData.commercialResults.metrics];
                          updated[index].label = e.target.value;
                          setFormData({ ...formData, commercialResults: { ...formData.commercialResults, metrics: updated } });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Display Value (e.g. 14,285 or 3.1x)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={metric.display}
                        onChange={(e) => {
                          const updated = [...formData.commercialResults.metrics];
                          updated[index].display = e.target.value;
                          setFormData({ ...formData, commercialResults: { ...formData.commercialResults, metrics: updated } });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Change Badge (e.g. +115.3% Surge)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={metric.change}
                        onChange={(e) => {
                          const updated = [...formData.commercialResults.metrics];
                          updated[index].change = e.target.value;
                          setFormData({ ...formData, commercialResults: { ...formData.commercialResults, metrics: updated } });
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="form-label">Detailed Explanation</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={metric.detail}
                      onChange={(e) => {
                        const updated = [...formData.commercialResults.metrics];
                        updated[index].detail = e.target.value;
                        setFormData({ ...formData, commercialResults: { ...formData.commercialResults, metrics: updated } });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="form-group" style={{ marginTop: '24px' }}>
              <label className="form-label">Collaborative Team Attribution Notice</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.commercialResults.attribution}
                onChange={(e) => setFormData({
                  ...formData,
                  commercialResults: { ...formData.commercialResults, attribution: e.target.value }
                })}
              />
            </div>
          </div>
        )}

        {/* Tab: Work Experience */}
        {activeTab === 'experience' && (
          <div className="admin-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="admin-card-heading">
                  <Briefcase size={20} color="var(--accent-orange)" />
                  <span>Chronological Work Experience ({formData.workExperience.length})</span>
                </h3>
                <p className="admin-card-sub">
                  Add, edit, or reorganize career roles, location flags, and bullet highlights.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newRole = {
                    role: 'Commercial Leadership Position',
                    company: 'Enterprise Technology Co.',
                    location: 'Colombo, Sri Lanka',
                    countryFlag: '🇱🇰',
                    period: '2025 – Present',
                    current: true,
                    highlights: [
                      'Key accomplishment or commercial responsibility bullet point 1.',
                      'Key accomplishment or commercial responsibility bullet point 2.'
                    ]
                  };
                  setFormData({
                    ...formData,
                    workExperience: [newRole, ...formData.workExperience]
                  });
                }}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <Plus size={15} />
                <span>Add Career Role</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {formData.workExperience.map((job, index) => (
                <div key={index} className="admin-item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {job.role} at {job.company}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.workExperience.filter((_, i) => i !== index);
                        setFormData({ ...formData, workExperience: updated });
                      }}
                      className="admin-delete-btn"
                      title="Delete Role"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Job Title / Role</label>
                      <input
                        type="text"
                        className="form-control"
                        value={job.role}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[index].role = e.target.value;
                          setFormData({ ...formData, workExperience: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={job.company}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[index].company = e.target.value;
                          setFormData({ ...formData, workExperience: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Location (e.g. Dubai, UAE)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={job.location}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[index].location = e.target.value;
                          setFormData({ ...formData, workExperience: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Country Flag Emoji (e.g. 🇦🇪 or 🇬🇧)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={job.countryFlag}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[index].countryFlag = e.target.value;
                          setFormData({ ...formData, workExperience: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Period / Dates</label>
                      <input
                        type="text"
                        className="form-control"
                        value={job.period}
                        onChange={(e) => {
                          const updated = [...formData.workExperience];
                          updated[index].period = e.target.value;
                          setFormData({ ...formData, workExperience: updated });
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="form-label">Bullet Highlights (One per line)</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={job.highlights.join('\n')}
                      onChange={(e) => {
                        const updated = [...formData.workExperience];
                        updated[index].highlights = e.target.value.split('\n').filter(Boolean);
                        setFormData({ ...formData, workExperience: updated });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Awards & Recognition */}
        {activeTab === 'awards' && (
          <div className="admin-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="admin-card-heading">
                  <Award size={20} color="var(--accent-orange)" />
                  <span>Awards & Industry Accolades ({formData.awardsList.length})</span>
                </h3>
                <p className="admin-card-sub">
                  Highlight national and global honors awarded to MillionSpaces & team.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newAward = {
                    id: `award-${Date.now()}`,
                    tier: 'Winner',
                    title: 'New Industry Honor',
                    level: 'National Level',
                    organization: 'SLASSCOM National Ingenuity Awards',
                    year: '2022',
                    attribution: 'Attributed to MillionSpaces and the team, highlighting contribution to product innovation.',
                    description: 'Detailed description of the achievement.'
                  };
                  setFormData({
                    ...formData,
                    awardsList: [...formData.awardsList, newAward]
                  });
                }}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <Plus size={15} />
                <span>Add Award</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {formData.awardsList.map((award, index) => (
                <div key={award.id || index} className="admin-item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-orange)' }}>
                      {award.tier} — {award.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.awardsList.filter((_, i) => i !== index);
                        setFormData({ ...formData, awardsList: updated });
                      }}
                      className="admin-delete-btn"
                      title="Delete Award"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Tier (Winner / Runner-Up / Finalist)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={award.tier}
                        onChange={(e) => {
                          const updated = [...formData.awardsList];
                          updated[index].tier = e.target.value;
                          setFormData({ ...formData, awardsList: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Award Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={award.title}
                        onChange={(e) => {
                          const updated = [...formData.awardsList];
                          updated[index].title = e.target.value;
                          setFormData({ ...formData, awardsList: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Level (e.g. National / Provincial)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={award.level}
                        onChange={(e) => {
                          const updated = [...formData.awardsList];
                          updated[index].level = e.target.value;
                          setFormData({ ...formData, awardsList: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Organization Body</label>
                      <input
                        type="text"
                        className="form-control"
                        value={award.organization}
                        onChange={(e) => {
                          const updated = [...formData.awardsList];
                          updated[index].organization = e.target.value;
                          setFormData({ ...formData, awardsList: updated });
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={award.year}
                        onChange={(e) => {
                          const updated = [...formData.awardsList];
                          updated[index].year = e.target.value;
                          setFormData({ ...formData, awardsList: updated });
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="form-label">Team Attribution String</label>
                    <input
                      type="text"
                      className="form-control"
                      value={award.attribution}
                      onChange={(e) => {
                        const updated = [...formData.awardsList];
                        updated[index].attribution = e.target.value;
                        setFormData({ ...formData, awardsList: updated });
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label className="form-label">Description / Innovation Context</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={award.description}
                      onChange={(e) => {
                        const updated = [...formData.awardsList];
                        updated[index].description = e.target.value;
                        setFormData({ ...formData, awardsList: updated });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: International Reach */}
        {activeTab === 'international' && (
          <div className="admin-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="admin-card-heading">
                  <Globe size={20} color="var(--accent-orange)" />
                  <span>Global Footprint & On-Site Exposure</span>
                </h3>
                <p className="admin-card-sub">
                  Highlight on-site countries (UK, Netherlands, Dubai, Sri Lanka) and remote campaigns (Singapore, Australia, EMEA).
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newExp = {
                    country: 'New Region',
                    flag: '🌐',
                    type: 'Market Entry & Campaign Scope',
                    note: 'Summary of stakeholder exposure or on-site engagement.'
                  };
                  setFormData({
                    ...formData,
                    internationalExposure: [...formData.internationalExposure, newExp]
                  });
                }}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <Plus size={15} />
                <span>Add Region</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {formData.internationalExposure.map((exp, index) => (
                <div key={index} className="admin-item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '1.4rem' }}>{exp.flag}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.internationalExposure.filter((_, i) => i !== index);
                        setFormData({ ...formData, internationalExposure: updated });
                      }}
                      className="admin-delete-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Country / Region</label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.country}
                      onChange={(e) => {
                        const updated = [...formData.internationalExposure];
                        updated[index].country = e.target.value;
                        setFormData({ ...formData, internationalExposure: updated });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Flag Emoji</label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.flag}
                      onChange={(e) => {
                        const updated = [...formData.internationalExposure];
                        updated[index].flag = e.target.value;
                        setFormData({ ...formData, internationalExposure: updated });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Experience Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.type}
                      onChange={(e) => {
                        const updated = [...formData.internationalExposure];
                        updated[index].type = e.target.value;
                        setFormData({ ...formData, internationalExposure: updated });
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Note / Highlights</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={exp.note}
                      onChange={(e) => {
                        const updated = [...formData.internationalExposure];
                        updated[index].note = e.target.value;
                        setFormData({ ...formData, internationalExposure: updated });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Tools & Stack */}
        {activeTab === 'tools' && (
          <div className="admin-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="admin-card-heading">
                  <Wrench size={20} color="var(--accent-orange)" />
                  <span>Tools & Platforms Mastered ({formData.toolsList.length})</span>
                </h3>
                <p className="admin-card-sub">
                  Edit sales, CRM, advertising, and agile productivity tooling.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newTool = {
                    name: 'New Tool',
                    category: 'crm',
                    label: 'Sales Automation'
                  };
                  setFormData({
                    ...formData,
                    toolsList: [...formData.toolsList, newTool]
                  });
                }}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <Plus size={15} />
                <span>Add Tool</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
              {formData.toolsList.map((tool, index) => (
                <div key={index} className="admin-item-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.toolsList.filter((_, i) => i !== index);
                        setFormData({ ...formData, toolsList: updated });
                      }}
                      className="admin-delete-btn"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label className="form-label">Tool Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={tool.name}
                      onChange={(e) => {
                        const updated = [...formData.toolsList];
                        updated[index].name = e.target.value;
                        setFormData({ ...formData, toolsList: updated });
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={tool.category}
                      onChange={(e) => {
                        const updated = [...formData.toolsList];
                        updated[index].category = e.target.value;
                        setFormData({ ...formData, toolsList: updated });
                      }}
                    >
                      <option value="crm">CRM & Sales</option>
                      <option value="marketing">Ads & Marketing</option>
                      <option value="analytics">Analytics & Data</option>
                      <option value="collab">Productivity & PM</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Short Label</label>
                    <input
                      type="text"
                      className="form-control"
                      value={tool.label}
                      onChange={(e) => {
                        const updated = [...formData.toolsList];
                        updated[index].label = e.target.value;
                        setFormData({ ...formData, toolsList: updated });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Education & FAQs */}
        {activeTab === 'education' && (
          <div className="admin-section-card">
            <h3 className="admin-card-heading">
              <GraduationCap size={20} color="var(--accent-orange)" />
              <span>Academic Degrees & Recruiter FAQs</span>
            </h3>

            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginTop: '20px', marginBottom: '12px' }}>
              Academic Degrees:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
              {formData.educationList.map((edu, index) => (
                <div key={index} className="admin-item-card">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...formData.educationList];
                          updated[index].degree = e.target.value;
                          setFormData({ ...formData, educationList: updated });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Honors / Grade</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.honors}
                        onChange={(e) => {
                          const updated = [...formData.educationList];
                          updated[index].honors = e.target.value;
                          setFormData({ ...formData, educationList: updated });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Institution</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...formData.educationList];
                          updated[index].institution = e.target.value;
                          setFormData({ ...formData, educationList: updated });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '12px' }}>
              Frequently Asked Questions (FAQs):
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {formData.faqs.map((faq, index) => (
                <div key={index} className="admin-item-card">
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label className="form-label">Question</label>
                    <input
                      type="text"
                      className="form-control"
                      value={faq.q}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[index].q = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Answer</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={faq.a}
                      onChange={(e) => {
                        const updated = [...formData.faqs];
                        updated[index].a = e.target.value;
                        setFormData({ ...formData, faqs: updated });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Floating Bottom Save Action Bar */}
      <div className="admin-save-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-orange)' }} />
            <span>
              {isSupabaseConnected ? 'Cloud Sync Mode Active' : 'Local Storage Mode'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link to="/" target="_blank" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              Preview Live
            </Link>

            <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
              <Save size={16} />
              <span>Save All Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
