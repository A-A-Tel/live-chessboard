import Chessboard from '@/components/chessboard';
import { Auth } from '@/types';
import Header from '@/components/header';
import { BoardState, initialEmptyBoard } from '@/components/chessboard/Chessboard';
import { useState } from 'react';

export default function Test({auth}: { auth: Auth}) {
    const [board, setBoard] = useState<BoardState>(initialEmptyBoard.slice())

    const onMoveAttempt = (fromIndex: number, toIndex: number) => {
        const newBoard = board.slice()
        newBoard[toIndex] = newBoard[fromIndex]
        newBoard[fromIndex] = { piece: null, color: null }
        setBoard(newBoard)
    }

    return (
        <>
            <Header user={auth.user} />
            <div className="w-1/2">
                <Chessboard
                    boardState={board}
                    readOnly={false}
                    onMoveAttempt={onMoveAttempt}
                />
            </div>
        </>
    );
}
