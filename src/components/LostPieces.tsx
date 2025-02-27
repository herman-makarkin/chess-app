import React, { FC } from 'react'
import { Figure } from '../modules/figures/Figure';

interface LostPiecesProps {
  title: string,
  pieces: Figure[],
}

const LostPieces: FC<LostPiecesProps> = ({ title, pieces }) => {
  return (
    <div className='lost'>
      <h3>{title}</h3>
      {pieces.map(piece => (
        <div key={piece.id} className="lostPiece">
          {piece.logo && <img src={piece.logo} alt={piece.name} />}
        </div>
      ))}
    </div>
  )
}

export default LostPieces;
