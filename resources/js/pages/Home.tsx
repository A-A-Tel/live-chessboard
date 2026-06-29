import { Auth, ListGame, User } from '@/types';
import Games from '@/components/games';
import Header from '@/components/header';
import Leaderboard from '@/components/leaderboard';

const buildLeaderboard = (games: ListGame[]) => {
    return Object.values(
        games.reduce(
            (acc, game) => {
                const winner = game.winner;
                if (!winner) return acc;

                if (!acc[winner.id]) {
                    acc[winner.id] = {
                        user: winner,
                        wins: 0,
                    };
                }

                acc[winner.id].wins++;

                return acc;
            },
            {} as Record<number, { user: User; wins: number }>,
        ),
    )
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 10);
};

export default function Home({auth, games, week, day} : { auth: Auth, games: ListGame[], week: ListGame[], day: ListGame[] }) {

    const allTimeLeaderboard = buildLeaderboard(games);
    const dayLeaderboard = buildLeaderboard(day);
    const weekLeaderboard = buildLeaderboard(week);

    return (
        <>
            <Header user={auth.user} />

            <div className="m-24 flex gap-24">
                <div className="flex w-full flex-col gap-8">
                    <h1 className="primary-text text-6xl">Statistieken</h1>

                    <Leaderboard title="Altijd" data={allTimeLeaderboard} />

                    <Leaderboard title="Vandaag" data={dayLeaderboard} />

                    <Leaderboard title="Deze week" data={weekLeaderboard} />
                </div>

                <Games games={games} />
            </div>
        </>
    );
}
