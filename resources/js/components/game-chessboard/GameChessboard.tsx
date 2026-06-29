import { Chess } from 'chess.js';
import { useMemo, useCallback } from 'react';
import Chessboard, { BoardState } from '@/components/chessboard/Chessboard';
import { type Piece as PieceName } from '@/components/chessboard/Piece';

type GameChessboardProps = {
    moves: string[];
    onMove: (move: string) => void;
    playerColor?: 'white' | 'black';
}

const PIECE_MAP: Record<string, PieceName> = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
};

function indexToSquare(index: number): string {
    const file = String.fromCharCode('a'.charCodeAt(0) + (index % 8));
    const rank = 8 - Math.floor(index / 8);
    return `${file}${rank}`;
}

function buildChessInstance(moves: string[]): Chess {
    const chess = new Chess();
    for (const move of moves) {
        chess.move(move);
    }
    return chess;
}

function chessJsBoardToState(chess: Chess): BoardState {
    const board = chess.board();
    const state: BoardState = [];

    for (const rank of board) {
        for (const square of rank) {
            if (square === null) {
                state.push({ piece: null, color: null });
            } else {
                state.push({
                    piece: PIECE_MAP[square.type],
                    color: square.color === 'w' ? 'white' : 'black',
                });
            }
        }
    }

    return state;
}

export default function GameChessboard({
                                           moves,
                                           onMove,
                                           playerColor = 'white',
                                       }: GameChessboardProps) {
    const { boardState, chess } = useMemo(() => {
        const chess = buildChessInstance(moves);
        return { boardState: chessJsBoardToState(chess), chess };
    }, [moves]);

    const isMyTurn = chess.turn() === (playerColor === 'white' ? 'w' : 'b');

    const handleMoveAttempt = useCallback((fromIndex: number, toIndex: number) => {
        const from = indexToSquare(fromIndex);
        const to = indexToSquare(toIndex);

        const tempChess = buildChessInstance(moves);

        try {
            const result = tempChess.move({ from, to, promotion: 'q' });
            if (result) {
                onMove(result.san);
            }
        } catch { /* empty */ }
    }, [moves, onMove]);

    return (
        <Chessboard
            boardState={boardState}
            reversed={playerColor === 'black'}
            readOnly={!isMyTurn}
            onMoveAttempt={handleMoveAttempt}
        />
    );
}
