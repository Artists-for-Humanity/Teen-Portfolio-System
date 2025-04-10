export type Studio = 'graphic-design'; // | 'photography' | 'painting' | 'sculpture';

export interface ArtworkApplication {
  artist: string;
  email: string;
  title: string;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior';
  studio: Studio;
  file: string;
  approved: boolean;
}

export interface Artwork {
  artist: string;
  email: string;
  title: string;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior';
  studio: Studio;
  file: string;
  price?: number;
}

export interface Artist {
  firstName: string;
  lastName: string;
  fullName: string;
  artworks: Artwork[];
  email: string;
  studio: Studio;
  bio: string;
  year: 'freshman' | 'sophomore' | 'junior' | 'senior';
  profilePicture: string;
}