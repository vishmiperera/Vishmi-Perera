# Vishmi Perera — Executive Portfolio with Supabase Cloud Sync & Color Theme Engine

A modern, responsive, high-converting portfolio website for **Vishmi Perera** — B2B Sales & Marketing Leader with 8+ years of cross-border experience. Built in **React 18 + Vite** with a full-featured, password-protected **Admin Portal**, **Supabase Cloud Database Sync**, and **Color Theme Customizer**.

---

## 🔒 Owner Admin Portal Access

The portfolio includes an **Admin Portal** allowing Vishmi Perera (the owner) to customize and edit all sections in real-time.

- **URL Route**: `/admin` (or click the lock icon `🔒` in the navigation bar / footer "Admin Portal 🔒")
- **Owner Password**: `VPerera@97`

---

## 🎨 Color Theme Customizer (7 Presets + Custom Hex Picker)

You can change the accent color theme of the entire website from the Admin Portal (`/admin` → **Color Themes** tab):

1. **Signature Warm Orange** (Default Jenny Scott creative palette)
2. **Executive Sapphire Blue** (High-trust B2B enterprise tech tone)
3. **Emerald Growth** (Modern SaaS venture capital scale)
4. **Electric Violet & AI** (Disruptive tech, AI automation & innovation)
5. **Rose Gold & Crimson** (Modern executive luxury contrast)
6. **Prestige Amber Gold** (Award-winning distinction & warmth)
7. **Nordic Teal** (Refined European maritime & tech consulting)
8. **Custom Hex Color Picker**: Pick any custom brand color via color picker or hex input code (`#10B981`, `#FF5722`, etc.) — tints, hover tones, and ambient glows are calculated automatically!

Theme selection persists in **Supabase / localStorage** and updates the live site instantly for all visitors!

---

## ☁️ Step-by-Step Supabase Cloud Database Setup

By default, the portfolio works seamlessly with `localStorage`. To make edits persist across all devices and visitors globally, connect a free **Supabase** cloud database in 3 minutes:

### Step 1: Create a Free Project on Supabase
1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project**, choose a name (e.g. `vishmi-portfolio`), set a database password, and choose your preferred region.

### Step 2: Run the SQL Schema
1. In your Supabase Project dashboard, click **SQL Editor** on the left menu.
2. Click **New query**, paste the following SQL script, and click **Run**:

```sql
create table if not exists portfolio_data (
  id text primary key,
  content jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table portfolio_data enable row level security;

-- Policy 1: Anyone can read portfolio data
drop policy if exists "Public read access" on portfolio_data;
create policy "Public read access"
  on portfolio_data for select
  using (true);

-- Policy 2: Allow insert/update with public anon key
drop policy if exists "Public upsert access" on portfolio_data;
create policy "Public upsert access"
  on portfolio_data for all
  using (true)
  with check (true);
```

### Step 3: Connect via the Admin Portal UI
1. In Supabase, go to **Project Settings** (gear icon) → **API**.
2. Copy your:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **anon / public Key** (e.g., `eyJhbGciOiJIUzI1Ni...`)
3. Open your portfolio Admin Portal at `/admin`, go to the **Supabase Cloud Sync** tab, paste the URL and Anon Key, and click **Connect & Sync with Supabase**!
4. You will see a green **"Supabase Cloud Connected"** badge. All current edits, image uploads, and theme choices are now stored in your Supabase cloud database!

*(Optional: You can also place them in a `.env` file as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if deploying to Vercel/Netlify).*

---

## 🚀 Quick Start

### 1. Development Mode
Run the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build
Compile and bundle optimized assets into `dist/`:
```bash
npm run build
```

### 3. Local Preview
Preview the production build locally:
```bash
npm run preview
```

---

## 🧭 Page Architecture & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Full creative showcase hero, marquee strip, service accordion, about preview, commercial results counters, awards, tools stack, and contact banner |
| `/services` | `src/pages/ServicesPage.jsx` | Deep dive into all 7 core capabilities, deliverables, methodology, and the 4-phase commercial delivery framework |
| `/experience` | `src/pages/ExperiencePage.jsx` | MillionSpaces Q1–Q4 2025 growth case study (+115% bookings, 3.1x revenue surge, 10+ team scope), chronological timeline, GitLab partner role, AIESEC, and UK on-site experience |
| `/about` | `src/pages/AboutPage.jsx` | Detailed biography, global on-site footprint (UK, Netherlands, Dubai UAE, Sri Lanka, APAC), First-Class Honours degree from Canterbury Christ Church University & Saegis Campus |
| `/awards` | `src/pages/AwardsPage.jsx` | Dedicated cards for all 5 awards: SLASSCOM National Ingenuity Awards 2021 (Winner National & Provincial, Runner-Up Start-Up), 2020 Disruptor, and Entrepreneurship World Cup 2021 Finalist with team attribution |
| `/contact` | `src/pages/ContactPage.jsx` | Direct channels (Email, Phone, WhatsApp, LinkedIn, Colombo timezone), interactive inquiry form with toast confirmation, and recruiter/client FAQs |
| `/admin` | `src/pages/AdminPortal.jsx` | **Password-protected admin dashboard** (`VPerera@97`) for complete in-browser section and image editing, color theme selection, and Supabase cloud sync |
