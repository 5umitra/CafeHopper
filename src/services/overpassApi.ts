export interface OverpassNode {
  type: 'node';
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    amenity?: string;
    [key: string]: string | undefined;
  };
}

export interface OverpassResponse {
  version: number;
  generator: string;
  elements: OverpassNode[];
}

/**
 * Fetches nearby cafes from OpenStreetMap using the Overpass API
 * @param lat - User's latitude
 * @param lng - User's longitude
 * @param radius - Search radius in meters (default: 8000m = 8km)
 * @returns Promise with array of cafe nodes
 */
export const fetchNearbyCafes = async (
  lat: number,
  lng: number,
  radius: number = 8000
): Promise<OverpassNode[]> => {
  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  
  // Overpass QL query to find cafes within radius
  const query = `
    [out:json];
    node(around:${radius}, ${lat}, ${lng})["amenity"="cafe"];
    out;
  `;

  try {
    const response = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`Overpass API request failed: ${response.status} ${response.statusText}`);
    }

    const data: OverpassResponse = await response.json();
    
    if (!data.elements || !Array.isArray(data.elements)) {
      throw new Error('Invalid response format from Overpass API');
    }

    return data.elements.filter(element => element.type === 'node');
  } catch (error) {
    console.error('Error fetching cafes from Overpass API:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to fetch nearby cafes: ${error.message}`
        : 'Failed to fetch nearby cafes: Unknown error'
    );
  }
};

/**
 * Converts Overpass API nodes to our Cafe interface
 * @param nodes - Array of Overpass nodes
 * @returns Array of Cafe objects
 */
export const convertOverpassNodesToCafes = (nodes: OverpassNode[]) => {
  return nodes.map((node, index) => ({
    id: node.id,
    name: node.tags?.name || `Unnamed Cafe ${index + 1}`,
    lat: node.lat,
    lng: node.lon,
    address: '', // Not available from basic Overpass query
    rating: 0, // Not available from OpenStreetMap
    specialty: 'Coffee & Beverages', // Generic specialty for OSM cafes
  }));
};