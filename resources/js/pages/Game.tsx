import { Auth, Comment, ListGame } from '@/types';
import GameChessboard from '@/components/game-chessboard';
import Header from '@/components/header';
import { Link } from '@inertiajs/react';
import Comments from '@/components/comments';

export default function Game({ auth, game, comments }: { auth: Auth, game: ListGame, comments: Comment[] }) {
    return (
        <>
            <Header user={auth.user} />
            <h1 className="primary-text mt-20 ml-20 text-6xl">
                Spel: {game.white_user.username} - {game.black_user.username}
            </h1>
            <div className="bg-light-primary mx-auto w-1/2 rounded-2xl p-7">
                <GameChessboard forceReadOnly={true} moves={game.moves.length === 0 ? [] : game.moves.split('|')} onMove={function (): void {}} />
                <Link href={'/profile/' + game.winner_id} className="secondary-text text-2xl">
                    Winnaar: {game.winner.username}
                </Link>
            </div>

            <Comments user={auth.user} comments={comments} postRoute={'game'} postId={game.id} />
        </>
    );
}
