import React from 'react'
import { withRouter } from 'react-router-dom'
import SwiperList from '../../components/SwiperList'
import ProductList from './ProductList'

function Home() {

    return (
        <div className="home">
            <h1>欢迎来到我们的网站！</h1>
            <SwiperList/>
            <ProductList />
        </div>
    )

}

export default withRouter(Home)