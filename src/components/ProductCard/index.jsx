import React from "react";
import { Link } from 'react-router-dom';
import Rating from "../Rating";
import './index.css'

function ProductCard({ product }) {
    console.log("productCard", product);
    return (
        <li key={product.id} className="g-grid_item g-carousel_slide swiper-slide_cls">
            <div id="handlebarsSectionRecommendProd_0" data-clickable="">
                <Link to={{ pathname: '/home/productList/productDetail', state: { id: product.id } }} className="g-card g-item click-notification">
                    <div className="g-card_head g-item_pic">
                        <img className="g-fw g-rc" src={product.image_url} alt="" width="600" height="600" />
                    </div>
                    <p className="g-card_body g-item_h">
                        {product.description}</p>
                    <div className="g-card_foot g-item_info">
                        <p className="g-price g-item_price" style={{ minHeight: 50 + 'px' }}>{product.low_price}～{product.high_price}<span>円（税込）</span></p>



                        {/* 引用评价的组件，传递参数 */}
                        <Rating averageRating={product.average_rating} totalReviewCount={product.total_review_count} />
                    </div>
                </Link>

            </div>
        </li>
    )
}


export default ProductCard;