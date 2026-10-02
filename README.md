# Kanha — Creative Director & Video Editor Portfolio

A modern, minimalist single-page portfolio website crafted with HTML, Tailwind CSS, Motion (Framer Motion engine), and Vanilla JavaScript.

## 🚀 Features

- **Header & Sticky Navigation:**
  - Creator branding with live pulse status indicator.
  - Smooth-scrolling anchor links (`#work`, `#testimonials`, `#story`, `#contact`).
  - Interactive Light / Dark Mode toggle with GPU-accelerated **Circular Mask Wipe (View Transitions API)** radial clip-path animation & icon rotation.
  - Pill-shaped high-contrast **"Book call"** CTA button.

- **Hero Section:**
  - High-contrast minimalist typography with tight letter spacing.
  - Social Proof pill badge (`+24 worked with @Nike, @RedBull and more`) with client avatars.
  - Translucent frosted grey CTA button (`see my work`) with folder icon.
  - Secondary text link with arrow micro-interaction (`book a 30 min call →`).
  - Key statistics showcase (45M+ Organic Views, 6+ Yrs Obsessed, 100% Delivery).

- **Selected Work Section (`#work`):**
  - High-impact video showcase grid.
  - Inline HTML5 `<video>` elements (`autoplay muted loop playsinline`) with high-resolution posters.
  - Centered semi-transparent frosted glass play button (`bg-white/20 backdrop-blur-md`).
  - Card hover scale and glow effects.
  - Interactive full-screen video lightbox modal with project descriptions.

- **Testimonials Section:**
  - "people saying i'm great at what i do" / "real messages. zero polish."
  - Screenshot-style testimonial cards (iMessage, Twitter DM, Slack thread, WhatsApp).
  - Horizontal carousel with interactive `←` and `→` arrow controls plus mouse drag and touch swipe support.

- **My Story / Timeline Section:**
  - Vertical milestone timeline with glowing nodes and connecting line.
  - Milestones spanning from 2020 through 2026.

- **Footer & Contact Section:**
  - Main statement: *"if you've read this far, you might be interested in what i do."*
  - One-click copy email button with interactive toast notification.
  - "Book a 30 min call" interactive booking modal with time slots and confirmation.
  - Social links (X/Twitter, Instagram, YouTube, GitHub).

- **Design System:**
  - **Dark Mode (Default):** Pitch black (`#000000`), white headings (`#FFFFFF`), dark charcoal containers (`#111111`), subtle borders (`#222222`), muted grey text (`#A1A1AA`).
  - **Light Mode:** Off-white (`#FAFAFA`), dark headings (`#09090B`), light grey containers (`#F4F4F5`), light borders (`#E4E4E7`).
  - **Theme Persistence:** Stored in `localStorage`.
  - **Typography:** Google Fonts Inter with `tracking-tight` and `tracking-tighter`.
  - **Animations:** Motion (Framer Motion web engine) scroll-triggered fade-ins and spring transitions.

## 🛠️ How to Run Locally

You can open `index.html` directly in any browser or launch a local dev server:

### Option 1: Using Node (Included script)
```bash
node server.js
```
Then visit `http://localhost:3000` in your browser.

### Option 2: Using Python
```bash
python3 -m http.server 3000
```

### Option 3: Direct File Opening
Double-click `index.html` in your file explorer / Finder to view it directly in your browser.

## 📁 File Structure
```
KanhaPortfolio/
├── index.html        # Main single-page portfolio layout & semantic markup
├── styles.css        # Design tokens, theme styling, glassmorphism & micro-animations
├── script.js         # Theme toggle, Framer Motion controller, modals & carousel
├── server.js         # Lightweight local dev server
└── README.md         # Documentation
```
