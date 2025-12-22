---
name: Snapshot Portfolio Website
overview: Build a single-page Next.js portfolio with a vertical timeline where clicking thumbtacks reveals Polaroid-style cards with a developing photo animation effect.
todos: []
---

# Snapshot Portfolio Website

## Overview

Create a minimalist single-page portfolio with a vertical timeline. Projects are revealed as Polaroid cards when clicking thumbtacks, with a camera flash effect and photo development animation.

## Project Structure

```javascript
personal-site/
├── app/
│   ├── layout.tsx          # Root layout with custom cursor
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles + custom cursor
├── components/
│   ├── Timeline.tsx        # Vertical timeline with thumbtacks
│   ├── Polaroid.tsx        # Polaroid card component
│   └── FlashOverlay.tsx    # White flash effect
├── data/
│   └── experiences.ts      # Sample project data array
└── package.json            # Dependencies
```



## Implementation Details

### 1. Project Setup

- Initialize Next.js 14+ with App Router
- Configure Tailwind CSS
- Install Framer Motion for animations
- Set up TypeScript

### 2. Data Structure (`data/experiences.ts`)

Create an array of experience objects with:

- `title`: string
- `date`: string
- `description`: string
- `imageUrl`: string (placeholder URLs for sample data)
- `caption`: string (for Polaroid bottom)

### 3. Custom Cursor (`app/globals.css` + `app/layout.tsx`)

- CSS: Create a 40px square outline cursor using `cursor: none` and a custom cursor div
- Position cursor div to follow mouse movement
- Style as a simple square outline border

### 4. Timeline Component (`components/Timeline.tsx`)

- Render vertical dashed line (centered, using Tailwind border utilities)
- Map through experiences array to render thumbtacks at intervals
- Each thumbtack shows title and date
- Click handler to trigger Polaroid reveal
- Use Framer Motion for smooth positioning

### 5. Polaroid Component (`components/Polaroid.tsx`)

- White card with bottom-heavy padding (classic Polaroid style)
- Image container with initial blur/brightness filters
- Framer Motion animation: blur(20px) + brightness(2) → blur(0) + brightness(1) over 2s
- Caption text at bottom using handwritten font (e.g., "Kalam" or "Caveat")
- Position relative to clicked thumbtack

### 6. Flash Effect (`components/FlashOverlay.tsx`)

- Full-screen white overlay
- Framer Motion: opacity 0 → 1 → 0 in 0.1s on click
- Triggered when thumbtack is clicked

### 7. Main Page (`app/page.tsx`)

- State management: `selectedExperience` (null or experience object)
- Flash state for overlay trigger
- Layout: off-white background (#F9F9F9)
- Render Timeline component
- Conditionally render Polaroid when experience is selected
- Render FlashOverlay when flash state is true

### 8. Styling

- Background: `#F9F9F9`
- Typography: Inter/Geist for UI (system sans-serif fallback)
- Handwritten font for Polaroid captions (Google Fonts)
- Minimal spacing and clean layout

## Key Features

1. **Viewfinder Cursor**: Custom 40px square outline that follows mouse
2. **Click Interaction**: Click thumbtack → flash → reveal Polaroid
3. **Photo Development**: Image fades from blur/bright to clear over 2 seconds
4. **Single Polaroid**: Only one visible at a time (replaces previous)
5. **Minimalist Design**: Clean, off-white aesthetic with system fonts

## Technical Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hooks (useState, useEffect)

## Animation Flow

```javascript
Click Thumbtack
  ↓
Flash Overlay (0.1s white screen)
  ↓
Polaroid Appears (fade in)
  ↓
Image Development (2s: blur 20px → 0px, brightness 2 → 1)





```