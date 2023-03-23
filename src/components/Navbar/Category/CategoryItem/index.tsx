import React from 'react';
import { CategoryData } from '..';
import './index.css'




interface CategoryItemProps {
  category: CategoryData;
}

function CategoryItem({ category }:CategoryItemProps) {

  // console.log('xscas')
  return (
    <div className="g-gcategory_children" id="g-gcategory_Bed" aria-hidden="true">
      <p className="g-gcategory_h"><a className="g-hover"  href="/ec/cat/Bed/"><img className="lozad" data-src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg" alt="" width="120" height="120" src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg" data-loaded="true" />{category.title}<i className="g-i g-i-arrow-r" aria-hidden="true"></i>
      </a>
      </p>


      <p className="g-gcategory_more">
        <a href="/ec/cat/Bed/">
          <span>ベッド&nbsp;カテゴリを見る</span>
          <i className="g-i g-i-arrow-r" aria-hidden="true"></i>
        </a>
      </p>
      <ul className="g-gcategory_list">
        {category.subcategories.map((subcategory) => (
          <li key={subcategory.id}><a  href="/ec/cat/Bed/BedFrameStorage/1/">{subcategory.title}</a></li>
        ))}

      </ul>

    </div>
  )


}


export default CategoryItem