# CafeHopper

<div align="center">

![CafeHopper Logo](https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop)

**Discover Great Coffee Spots Around You**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

[Live Demo](https://cafehop.netlify.app) • [Documentation](#installation) • [Report Bug](https://github.com/yourusername/cafehop/issues) • [Request Feature](https://github.com/yourusername/cafehop/issues)

</div>

---

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
