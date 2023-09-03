export interface ShowBody {
  day: string;
  startTime: string;
  endTime: string;
  band: string;
}

export interface ShowBandBody {
  id: string;
  day: string;
  band: string;
  bandName: string;
  startTime: string;
  endTime: string;
}

export interface ShowSelected {
  showId: string;
  day: string;
  band: string;
  startTime: string;
  endTime: string;
}

export interface CreateShowInput {
  week_day: string;
  start_time: number;
  end_time: number;
  band_id: string;
}
