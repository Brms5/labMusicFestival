export interface BandResponse {
  id: string;
  name: string;
  music_genre: string;
  responsible: string;
  band_image: string;
}

export interface BandBody {
  name: string;
  music_genre: string;
  responsible: string;
  band_image: string;
  [key: string]: string;
}
