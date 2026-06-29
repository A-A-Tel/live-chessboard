import GameChessboard from '@/components/game-chessboard';
import Header from '@/components/header';
import { Auth, Game } from '@/types';
import { router } from '@inertiajs/react';
import { useEchoPresence } from '@laravel/echo-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

type PlayProps = {
    auth: Auth;
    game: Game;
};

export default function Play({ auth, game }: PlayProps) {
    const [moves, setMoves] = useState<string[]>(game.moves ? game.moves.split('|') : []);
    const [ended, setEnded] = useState(game.ended);

    if (!auth.user) router.visit('');

    const playerColor = game.white_user_id === auth.user?.id ? 'white' : 'black';

    const { channel } = useEchoPresence(`play.${game.id}`);

    useEffect(() => {
        const interval = setInterval(() => {
            const ch = channel();
            if (!ch) return;

            clearInterval(interval);

            ch.listen('.MoveMade', (e: { move: string }) => {
                setMoves((prev) => [...prev, e.move]);
            });

            ch.listen('.MatchEnded', (e: { winnerId: number | null; reason: string }) => {
                setEnded(true);
                if (e.winnerId === auth.user?.id) alert('Je hebt gewonnen!');
                else if (e.winnerId === null) alert('Remise!');
                else alert('Je hebt verloren.');
                router.visit(`/game/${game.id}`);
            });
        }, 100);

        return () => clearInterval(interval);
    }, [channel]);

    const onMove = async (move: string) => {
        try {
            await axios.patch(`/game/${game.id}/move`, { move });
        } catch {
            setMoves((prev) => prev.slice(0, -1));
        }
    };

    const onForfeit = async () => {
        if (!confirm('Weet je zeker dat je wil opgeven?')) return;
        await axios.patch(`/game/${game.id}/forfeit`);
    };

    return (
        <>
            <Header user={auth.user} />
            <div className="mx-auto flex w-1/2 flex-col gap-4 py-8">
                <GameChessboard moves={moves} onMove={onMove} playerColor={playerColor} />
                {!ended && (
                    <button onClick={onForfeit} className="secondary-text self-end text-sm text-red-500 hover:underline">
                        Opgeven
                    </button>
                )}
            </div>
        </>
    );
}
