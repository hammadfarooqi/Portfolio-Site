/**
 * Shared type definitions across the application
 */

/**
 * Photo data structure
 */
export interface Photo {
  imageUrl: string;
  caption: string;
  longDescription: string;
}

/**
 * Experience data structure representing a work experience or event
 */
export interface Experience {
  title: string;
  date: string;
  shortDescription: string; // For notecards
  photos: Photo[]; // Multiple photos per experience
}

/**
 * Data structure for a polaroid photo that appears on the page
 */
export interface PolaroidData {
  experience: Experience;
  photo: Photo;
  index: number;
  rotation: number;
  id: string; // Unique identifier for stable keys
}

