import React from 'react'
import { withRouter } from 'react-router-dom'
import Navibar from '../../components/Navbar'
import SwiperList from '../../components/SwiperList'
import ProductList from './ProductList'
import './index.css'
function Home() {

    return (
        <div className="home">
            <h1>欢迎来到我们的网站！</h1>
            <Navibar/>
            <SwiperList/>
            <ProductList />
        </div>
    )

}

export default withRouter(Home)