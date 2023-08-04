import { Show, showSchema } from "@server/schema/show";

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

interface ShowService {
  getShowsByDate: (weekDay: string) => Promise<Show[]>;
}

export const showService: ShowService = {
  getShowsByDate,
};
