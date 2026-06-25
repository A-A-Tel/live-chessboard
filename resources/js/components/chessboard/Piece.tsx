import whitePawn from '../../../img/pieces/white/pawn.png';
import whiteRook from '../../../img/pieces/white/rook.png';
import whiteKnight from '../../../img/pieces/white/knight.png';
import whiteBishop from '../../../img/pieces/white/bishop.png';
import whiteQueen from '../../../img/pieces/white/queen.png';
import whiteKing from '../../../img/pieces/white/king.png'

import blackPawn from '../../../img/pieces/black/pawn.png';
import blackRook from '../../../img/pieces/black/rook.png';
import blackKnight from '../../../img/pieces/black/knight.png';
import blackBishop from '../../../img/pieces/black/bishop.png';
import blackQueen from '../../../img/pieces/black/queen.png';
import blackKing from '../../../img/pieces/black/king.png';
import React from 'react';

export type Piece = 'pawn'|'rook'|'knight'|'bishop'|'queen'|'king';
export type PieceColor = 'white' | 'black';

const pieceImages: Record<PieceColor, Record<Piece, string>> = {
    white: {
        pawn: whitePawn,
        rook: whiteRook,
        knight: whiteKnight,
        bishop: whiteBishop,
        queen: whiteQueen,
        king: whiteKing,
    },
    black: {
        pawn: blackPawn,
        rook: blackRook,
        knight: blackKnight,
        bishop: blackBishop,
        queen: blackQueen,
        king: blackKing,
    },
};

function getImage(piece: Piece, color: PieceColor): string {
    return pieceImages[color][piece];
}

export type PieceProps = {
    type: Piece;
    color: PieceColor;
    draggable: boolean;
    onDragStart: (e: React.DragEvent) => void;
}

export default function Piece({ type, color, draggable, onDragStart }: PieceProps) {
    const src = getImage(type, color);

    return (
        <img
            src={src}
            alt={`${color} ${type}`}
            draggable={draggable}
            onDragStart={onDragStart}
            style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                cursor: draggable ? 'grab' : 'default',
                transition: 'transform 0.1s ease',
            }}
            onMouseDown={(e) => draggable && (e.currentTarget.style.cursor = 'grabbing')}
            onMouseUp={(e) => draggable && (e.currentTarget.style.cursor = 'grab')}
        />
    );
}
