import { Show, showSchema } from "@server/schema/show";
import { CreateShowInput } from "@server/types/show";
import { CreateShowBody } from "@ui/types/show";

function getShowsByDate(weekDay: string): Promise<Show[]> {
  return fetch(`/api/shows?weekday=${weekDay}`)
    .then(async (response) => {
      if (!response.ok) throw new Error("Failed to Request Shows");

      const showResponse = await response.json();
      const shows = showSchema.array().safeParse(showResponse);
      if (!shows.success) throw new Error(shows.error.message);

      return shows.data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

function getAllShows(): Promise<Show[]> {
  return fetch("/api/shows")
    .then(async (response) => {
      if (!response.ok) throw new Error("Failed to Request Shows");

      const showResponse = await response.json();
      const shows = showSchema.array().safeParse(showResponse);
      if (!shows.success) throw new Error(shows.error.message);

      return shows.data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

function createShow(show: CreateShowBody): Promise<Show> {
  const newShow: CreateShowInput = {
    week_day: show.day,
    start_time: Number(show.startTime),
    end_time: Number(show.endTime),
    band_id: show.band,
  };
  return fetch("/api/shows", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newShow),
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("Failed to Create Show");

      const showResponse = await response.json();
      const show = showSchema.safeParse(showResponse);
      if (!show.success) throw new Error(show.error.message);

      return show.data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

function deleteShow(showId: string): Promise<void> {
  return fetch(`/api/shows?id=${showId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) throw new Error("Failed to Delete Show");
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

interface ShowService {
  getShowsByDate: (weekDay: string) => Promise<Show[]>;
  getAllShows: () => Promise<Show[]>;
  createShow: (show: CreateShowBody) => Promise<Show>;
  deleteShow: (showId: string) => Promise<void>;
}

export const showService: ShowService = {
  getShowsByDate,
  getAllShows,
  createShow,
  deleteShow,
};
