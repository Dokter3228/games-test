export const getGame = async (seo_title: string) => {
  const games = await getGames();

  const game = games.find((game) => game.seo_title === seo_title);
  return game;
};

export const getGames = async () => {
  const response = await fetch(
    "https://nextjs-test-pi-hazel-56.vercel.app/data/games.json"
  );

  if (!response.ok) throw new Error("Something went wrong when fetching games");

  const games = response.json() as Promise<Game[]>;

  return games;
};

export type Game = {
  provider: string;
  title: string;
  seo_title: string;
  categories: string[];
  identifier: string;
};
