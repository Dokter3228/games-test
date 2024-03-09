import Link from "next/link";
import { getGames } from "../api/games";

export default async function Games() {
  const games = await getGames();

  const list = games.map((game) => ({
    provider: game.provider,
    seo_title: game.seo_title,
  }));

  return (
    <main>
      <div className="flex flex-col gap-3">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
          List of games:
        </h2>
        <ul className="text-lg max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
          {list.map((item) => (
            <Link
              key={item.seo_title}
              href={`games/${item.provider}/${item.seo_title}`}
            >
              <li>{`${item.provider}/${item.seo_title}`}</li>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}
