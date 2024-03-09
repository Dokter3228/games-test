import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { type Game, getGame, getGames } from "../../../../api/games";

export default async function Games({ params }: { params: { title: string } }) {
  const game = await getGame(params.title);

  if (!game) return notFound();

  return (
    <div className="flex justify-center">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image
          className="rounded-t-lg"
          src={`https://d2norla3tyc4cn.cloudfront.net/i/s3/${game.identifier}.webp`}
          width={400}
          height={400}
          alt={game.identifier}
          priority
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Title: {game.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Provider: {game.provider}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Categories
            {game.categories.map((category) => (
              <span key={category}>{category} </span>
            ))}
          </p>
          <Button asChild>
            <Link href="/">Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const games = await getGames();

  return generateAllStaticGamesRoutes(games);
}

const generateAllStaticGamesRoutes = (games: Game[]) =>
  games.reduce<{ provider: string; seo_title: string }[]>(
    (acc, { provider, seo_title, categories }) => {
      if (categories && categories.length > 0)
        categories.forEach((category) => {
          acc.push({
            provider: category,
            seo_title,
          });
        });
      acc.push({
        provider,
        seo_title,
      });
      return acc;
    },
    []
  );
