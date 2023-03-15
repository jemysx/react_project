import React from 'react';
import './index.css'
function Rating({ averageRating, totalReviewCount }) {
    return (
      <p className="g-score g-sm-score-sm g-item_score">
        <span data-score={averageRating}>
          <span className="g-clip">平均評価{averageRating}点</span>
        </span>
        <span aria-label="商品レビュー数">({totalReviewCount})</span>
      </p>
    );
  }


  export default Rating;