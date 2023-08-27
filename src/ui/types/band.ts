export interface BandResponse {
  id: string;
  name: string;
  music_genre: string;
  responsible: string;
  band_image: string;
}

export interface CreateBandBody {
  name: string;
  music_genre: string;
  responsible: string;
  band_image: string;
}
