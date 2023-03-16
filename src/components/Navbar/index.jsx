import React from 'react'
import Category from './Category'
import './index.css'
function Navibar() {

    return (

        <div className="g-gnav g-sm-modal" id="g-gnav" role="dialog" aria-hidden="true" aria-modal="true" aria-labelledby="g-gnav_h" data-breakpoints="narrow">
            <div className="g-modal_backdrop">


                {/* <header className="g-modal_head">
                    <p className="g-modal_h" id="g-gnav_h">メニュー</p>

                    <button className="g-modal_close" type="button" aria-label="閉じる" aria-expanded="false" aria-controls="g-gnav"><i className="g-i g-i-close" aria-hidden="true"></i></button>
                </header> */}
                <div className="g-gnav_outer">
                    <nav className="g-gnav_inner" aria-label="閉じる">
                        <Category />

                    </nav>
                </div>

            </div>
        </div>


    )

}

export default Navibar