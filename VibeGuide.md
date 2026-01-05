# 🌤️ LIGHT THEME — *Editorial Calm, Confident*

### 🧠 Karakter

* Terasa seperti **artikel premium / research note**
* Banyak ruang
* Fokus ke readability & trust
* Teal terasa “intelektual”, bukan startup hype

---

## 🎨 Light Theme — Core Colors

```css
:root[data-theme="light"] {
  /* Base */
  --bg-primary: #F9FBF9;          /* off-white utama */
  --bg-secondary: #FFFFFF;        /* card / elevated */
  --bg-tertiary: #F1F5F4;         /* subtle section */

  /* Text */
  --text-primary: #0F172A;        /* near-black navy */
  --text-secondary: #64748B;      /* muted gray-blue */
  --text-tertiary: #94A3B8;

  /* Borders */
  --border-primary: rgba(15, 23, 42, 0.08);
  --border-secondary: rgba(15, 23, 42, 0.04);

  /* Accent — Teal */
  --accent-primary: #0F766E;
  --accent-secondary: #0D9488;
  --accent-muted: rgba(13, 148, 136, 0.12);

  /* Gold (whisper only) */
  --gold-accent: #D4AF37;
  --gold-muted: rgba(212, 175, 55, 0.18);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 12px 30px rgba(15, 23, 42, 0.12);
}
```

---

## 🧩 Light Theme — Usage Guidance

### Links

* Default: text-primary
* Hover: **teal underline**
* Active: teal text

### Cards

* White background
* Border very subtle
* Shadow only on hover

### Navbar

* Transparent / frosted
* Teal only for active state
* No background unless scroll

### Gold Usage (Light)

* Divider line
* Micro dot
* Hover sparkle
  ❌ **Never for text blocks**

---

# 🌑 DARK THEME — *Serious Systems, Quiet Authority*

### 🧠 Karakter

* “I build systems at night”
* Calm, deep, trustworthy
* Tidak hacker vibes
* Tidak neon cyberpunk

---

## 🎨 Dark Theme — Core Colors

```css
:root[data-theme="dark"] {
  /* Base */
  --bg-primary: #020617;          /* navy-black */
  --bg-secondary: #0B1324;        /* card / surface */
  --bg-tertiary: #111827;         /* subtle section */

  /* Text */
  --text-primary: #E5E7EB;        /* soft white */
  --text-secondary: #9CA3AF;      /* muted gray */
  --text-tertiary: #6B7280;

  /* Borders */
  --border-primary: rgba(255, 255, 255, 0.08);
  --border-secondary: rgba(255, 255, 255, 0.04);

  /* Accent — Teal */
  --accent-primary: #0D9488;
  --accent-secondary: #14B8A6;
  --accent-muted: rgba(20, 184, 166, 0.16);

  /* Gold (Prestige highlight) */
  --gold-accent: #C9A24D;
  --gold-muted: rgba(201, 162, 77, 0.22);

  /* Shadows (softer than light) */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 6px 20px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.6);
}
```

---

## 🧩 Dark Theme — Usage Guidance

### Cards

* Always slightly lighter than background
* Border > shadow (avoid floating too much)

### Links

* Teal text
* Hover: subtle glow (opacity-based, not blur-heavy)

### Gold Usage (Dark)

* Divider
* Section label underline
* Hover detail on important CTA

Gold di dark theme boleh **sedikit lebih kelihatan**, tapi tetap **<5%**.

---

# 🎞️ MOTION PRESET (GLOBAL)

```css
:root {
  --motion-fast: 200ms;
  --motion-base: 280ms;
  --motion-slow: 350ms;

  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Rules:

* opacity + translateY (4–12px)
* hover scale max **1.03**
* no bounce
* no elastic

---

# 🧠 DESIGN RULE (INI PENTING)

> **If it looks impressive at first glance, it’s probably wrong.**
>
> Your site should grow on people, not shout.

---

