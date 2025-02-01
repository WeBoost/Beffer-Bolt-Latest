import { supabase } from './supabase';

interface What3WordsResponse {
  coordinates: {
    lat: number;
    lng: number;
  };
  words: string;
  language: string;
  map: string;
}

export const validateWhat3Words = async (words: string): Promise<What3WordsResponse | null> => {
  try {
    // In a real implementation, you would call the What3words API here
    // For now, we'll simulate the API call with a basic validation
    const pattern = /^[a-zA-Z]+\.[a-zA-Z]+\.[a-zA-Z]+$/;
    
    if (!pattern.test(words)) {
      throw new Error('Invalid what3words format');
    }

    // Simulate API response
    // In production, replace this with actual API call
    return {
      coordinates: {
        lat: 51.520847,
        lng: -0.195521
      },
      words: words,
      language: "en",
      map: `https://what3words.com/${words}`
    };
  } catch (error) {
    console.error('Error validating what3words:', error);
    return null;
  }
};

export const convertToWhat3Words = async (lat: number, lng: number): Promise<string | null> => {
  try {
    // In a real implementation, you would call the What3words API here
    // For now, we'll return a placeholder
    return 'filled.count.soap';
  } catch (error) {
    console.error('Error converting coordinates to what3words:', error);
    return null;
  }
};