import React ,{useState}from 'react'
import './index.css'

function Category() {

    const [categoryState, setCategoryState] = useState(false)


    return (
        <div className="g-gnav_category">

            <button className="g-gnav_btn g-gnav_categoryBtn" type="button" aria-haspopup="false" aria-expanded="false" aria-controls="g-gcategory" data-breakpoints="wide" data-attr='{"wide":{"aria-haspopup":true}}' onMouseEnter={() => { setCategoryState(true) }} onMouseLeave={() => setCategoryState(false)}><i className="g-s g-s-category" aria-hidden="true"></i>カテゴリ<i className="fas fa-chevron-down" aria-hidden="true"></i></button>

            {categoryState ? <div className="g-gcategory" id="g-gcategory" aria-hidden="true" data-breakpoints="wide">

<ul className="g-gcategory_el" data-accordion-group>
    <li className="g-gcategory_item">
        <div className="g-gcategory_head"><a className="g-gcategory_name" href="/ec/cat/Bed/" aria-expanded="false" aria-controls="g-gcategory_Bed"><span><img className="lozad" src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg" alt="" width="31" height="31" />ベッド</span><i className="g-i g-i-arrow-d" aria-hidden="true"></i></a>
        </div>
        <div className="g-gcategory_children" id="g-gcategory_Bed" aria-hidden="true">
            <p className="g-gcategory_h"><a className="g-hover"  href="/ec/cat/Bed/"><img className="lozad" src="https://www.nitori-net.jp/ecstatic/image/sys-master/images/8993449607198/Bed.jpg" alt="" width="120" height="120" />ベッド<i className="g-i g-i-arrow-r" aria-hidden="true"></i></a></p>
            <p className="g-gcategory_more">
                <a href="/ec/cat/Bed/">
                    <span>ベッド&nbsp;カテゴリを見る</span>
                    <i className="g-i g-i-arrow-r" aria-hidden="true"></i>
                </a>
            </p>
            <ul className="g-gcategory_list">
                <li><a href="/ec/cat/Bed/BedFrameStorage/1/">収納付きベッド</a></li>
                <li><a  href="/ec/cat/Bed/BedFrameDrainboard/1/">すのこベッド</a></li>
            </ul>
        </div>
    </li>
</ul>
</div> : <></>}
          
        </div>
    )

}

export default Category