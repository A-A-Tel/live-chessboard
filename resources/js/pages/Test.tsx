import { Auth } from '@/types';
import Header from '@/components/header';
import { useState } from 'react';
import GameChessboard from '@/components/game-chessboard';

export default function Test({auth}: { auth: Auth}) {
    const [moves, setMoves] = useState<string[]>([]);


    return (
        <>
            <Header user={auth.user} />
            <div className="mx-auto w-1/2">
                <GameChessboard
                    moves={moves}
                    onMove={function (move: string): void {
                        setMoves([...moves, move])
                    }}
                    playerColor={moves.length % 2 === 0 ? 'white' : 'black'}
                />
            </div>
        </>
    );
}
