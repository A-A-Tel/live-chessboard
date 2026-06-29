import { ListGame } from '@/types';
import GameChessboard from '@/components/game-chessboard';
import { Link } from '@inertiajs/react';

export default function Games({games}: {games: ListGame[]}) {


    return (
        <>
            <div className="flex w-full flex-col">
                <h1 className="primary-text mb-11 text-6xl">Spelgeschiedenis</h1>
                <div className="bg-light-primary rounded-2xl p-7">
                    {games.map((game: ListGame) => (
                        <div key={game.id} className="mt-9 flex flex-col gap-8">
                            <Link href={'/game/' + game.id}>
                                <GameChessboard
                                    playerColor={game.winner_id === game.black_user_id ? 'black' : 'white'}
                                    forceReadOnly={true}
                                    moves={game.moves.length === 0 ? [] : game.moves.split('|')}
                                    onMove={function (): void {}}
                                />
                            </Link>
                            <Link href={'/profile/' + game.winner_id } className="secondary-text text-2xl">Winnaar: {game.winner.username}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
