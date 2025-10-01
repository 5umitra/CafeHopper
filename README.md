# CafeHopper (Find Nearby Cafes - MAP)

## Overview

**CafeHopper** is a web application designed to help users discover coffee shops near their location.  
It leverages real-time geolocation and OpenStreetMap data to provide an interactive map, detailed information about each cafe, and tools to plan your coffee visits.
I have added some more bonus feature like fetching the address and contact number of nearby cafes during fetching all those names of cafe through OverpassPI.

---

## Key Features

### Interactive Map
- Real-time location detection  
- Custom markers for cafes  
- Smooth zoom and pan controls  
- Responsive for desktop and mobile  

### Cafe Discovery
- Search radius of 8 km  
- Distance calculation from user's location  
- Cafe details including name, specialty, and address  
- Data powered by OpenStreetMap and Overpass API  

### User Experience
- Coffee-inspired design with warm tones  
- Micro-interactions and animations  
- Mobile-first responsive design  
- Accessibility-focused  

---

## Tech Stack

**Frontend**: React 18, TypeScript, Vite  
**Styling**: Tailwind CSS, Framer Motion, Lucide Icons  
**Mapping**: Leaflet, React Leaflet, OpenStreetMap, Overpass API  
**3D Visuals**: Three.js, React Three Fiber, Drei  
**Dev Tools**: ESLint, Vitest, PostCSS  

---

## Installation

### Prerequisites
- Node.js 18+  
- npm or yarn  
- A modern browser with geolocation support  

### Steps
```bash
# Clone repository
git clone https://github.com/yourusername/cafehop.git
cd cafehop

# Install dependencies
npm install

# Run development server
npm run dev


## Building Approach

### Phase 1: Foundation & Core Setup
• Set up the project structure with Vite + React + TypeScript for fast development
• Implemented geolocation API integration to detect user's current position
• Created custom hooks (`useGeolocation`, `useCafes`) for clean state management
• Established TypeScript interfaces for type safety across cafe and location data

### Phase 2: Map Integration & Data Fetching
• Integrated Leaflet with React Leaflet for interactive mapping functionality
• Connected to OpenStreetMap's Overpass API to fetch real-time cafe data within 8km radius
• Built custom marker components for both user location and cafe positions
• Implemented distance calculations and sorting algorithms for nearby cafe discovery

### Phase 3: UI/UX & Visual Polish
• Designed responsive layouts with mobile-first approach using Tailwind CSS
• Added Three.js background with coffee-themed particle effects for visual appeal
• Implemented smooth animations using Framer Motion for enhanced user experience
• Applied coffee-beige dark theme with proper contrast ratios for accessibility
