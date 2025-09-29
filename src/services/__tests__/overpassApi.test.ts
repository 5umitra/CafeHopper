import { convertOverpassNodesToCafes } from '../overpassApi';
import type { OverpassNode } from '../overpassApi';

describe('overpassApi', () => {
  describe('convertOverpassNodesToCafes', () => {
    it('should convert Overpass nodes to Cafe objects correctly', () => {
      const mockNodes: OverpassNode[] = [
        {
          type: 'node',
          id: 123456,
          lat: 37.7749,
          lon: -122.4194,
          tags: {
            name: 'Blue Bottle Coffee',
            amenity: 'cafe'
          }
        },
        {
          type: 'node',
          id: 789012,
          lat: 37.7849,
          lon: -122.4094,
          tags: {
            amenity: 'cafe'
          }
        }
      ];

      const result = convertOverpassNodesToCafes(mockNodes);

      expect(result).toHaveLength(2);
      
      expect(result[0]).toEqual({
        id: 123456,
        name: 'Blue Bottle Coffee',
        lat: 37.7749,
        lng: -122.4194,
        address: '',
        rating: 0,
        specialty: 'Coffee & Beverages'
      });

      expect(result[1]).toEqual({
        id: 789012,
        name: 'Unnamed Cafe 2',
        lat: 37.7849,
        lng: -122.4094,
        address: '',
        rating: 0,
        specialty: 'Coffee & Beverages'
      });
    });

    it('should handle empty nodes array', () => {
      const result = convertOverpassNodesToCafes([]);
      expect(result).toEqual([]);
    });

    it('should generate unique names for unnamed cafes', () => {
      const mockNodes: OverpassNode[] = [
        {
          type: 'node',
          id: 1,
          lat: 37.7749,
          lon: -122.4194,
          tags: { amenity: 'cafe' }
        },
        {
          type: 'node',
          id: 2,
          lat: 37.7849,
          lon: -122.4094,
          tags: { amenity: 'cafe' }
        }
      ];

      const result = convertOverpassNodesToCafes(mockNodes);

      expect(result[0].name).toBe('Unnamed Cafe 1');
      expect(result[1].name).toBe('Unnamed Cafe 2');
    });

    it('should handle nodes without tags', () => {
      const mockNodes: OverpassNode[] = [
        {
          type: 'node',
          id: 123,
          lat: 37.7749,
          lon: -122.4194
        }
      ];

      const result = convertOverpassNodesToCafes(mockNodes);

      expect(result[0]).toEqual({
        id: 123,
        name: 'Unnamed Cafe 1',
        lat: 37.7749,
        lng: -122.4194,
        address: '',
        rating: 0,
        specialty: 'Coffee & Beverages'
      });
    });
  });
});