import React from 'react';
import Piece, { type Piece as PieceName, type PieceColor} from '@/components/chessboard/Piece';

export type SquareData = {
    piece: PieceName | null;
    color: PieceColor | null;
}

export type BoardState = SquareData[];

export type ChessboardProps = {
    reversed?: boolean;
    boardState?: BoardState;
    readOnly?: boolean;
    onMoveAttempt: (fromIndex: number, toIndex: number) => void;
}

export const initialDefaultBoard: BoardState = [
    // Rank 8
    { piece: 'rook', color: 'black' },
    { piece: 'knight', color: 'black' },
    { piece: 'bishop', color: 'black' },
    { piece: 'queen', color: 'black' },
    { piece: 'king', color: 'black' },
    { piece: 'bishop', color: 'black' },
    { piece: 'knight', color: 'black' },
    { piece: 'rook', color: 'black' },

    // Rank 7
    { piece: 'pawn', color: 'black' },
    { piece: 'pawn', color: 'black' },
    { piece: 'pawn', color: 'black' },
    { piece: 'pawn', color: 'black' },
    { piece: 'pawn', color: 'black' },
    { piece: 'pawn', color: 'black' },
    { piece: 'pawn', color: 'black' },
    { piece: 'pawn', color: 'black' },

    // Rank 6
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },

    // Rank 5
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },

    // Rank 4
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },

    // Rank 3
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },
    { piece: null, color: null },

    // Rank 2
    { piece: 'pawn', color: 'white' },
    { piece: 'pawn', color: 'white' },
    { piece: 'pawn', color: 'white' },
    { piece: 'pawn', color: 'white' },
    { piece: 'pawn', color: 'white' },
    { piece: 'pawn', color: 'white' },
    { piece: 'pawn', color: 'white' },
    { piece: 'pawn', color: 'white' },

    // Rank 1
    { piece: 'rook', color: 'white' },
    { piece: 'knight', color: 'white' },
    { piece: 'bishop', color: 'white' },
    { piece: 'queen', color: 'white' },
    { piece: 'king', color: 'white' },
    { piece: 'bishop', color: 'white' },
    { piece: 'knight', color: 'white' },
    { piece: 'rook', color: 'white' },
];


export default function Chessboard({ boardState = initialDefaultBoard.slice(), readOnly = false, onMoveAttempt, reversed = false }: ChessboardProps) {
    const handleDragStart = (e: React.DragEvent, index: number) => {
        if (readOnly) {
            e.preventDefault();
            return;
        }
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e: React.DragEvent) => {
        if (!readOnly) {
            e.preventDefault();
        }
    };

    const handleDrop = (e: React.DragEvent, toIndex: number) => {
        if (readOnly) return;

        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);

        if (fromIndex !== toIndex) {
            onMoveAttempt(fromIndex, toIndex);
        }
    };

    return (
        <div className="grid aspect-square w-full grid-cols-8 grid-rows-8 shadow-[0_8px_24px_rgba(0,0,0,0.15)] select-none">
            {Array.from({ length: 64 }).map((_, displayIndex) => {
                const index = reversed ? 63 - displayIndex : displayIndex;

                const row = Math.floor(displayIndex / 8);
                const col = displayIndex % 8;
                const isDark = (row + col) % 2 === 1;

                const square = boardState[index];

                return (
                    <div
                        key={index}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`relative flex h-full w-full items-center justify-center ${
                            isDark ? 'bg-[#673AB7]' : 'bg-[#D0C3E8]'
                        }`}
                    >
                        {square?.piece && square?.color && (
                            <Piece
                                type={square.piece}
                                color={square.color}
                                draggable={!readOnly}
                                onDragStart={(e) => handleDragStart(e, index)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
