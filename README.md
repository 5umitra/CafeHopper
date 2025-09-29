# CafeHopper (Find Nearby Cafes - MAP)

## Overview

**CafeHopper** is a web application designed to help users discover coffee shops near their location.  
It leverages real-time geolocation and OpenStreetMap data to provide an interactive map, detailed information about each cafe, and tools to plan your coffee visits.

---

## Key Features

### Interactive Map
- Real-time location detection  
- Custom markers for cafes  
- Smooth zoom and pan controls  
- Responsive for desktop and mobile  

### Cafe Discovery
- Search radius of 8 km  
- Distance calculation from user’s location  
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

