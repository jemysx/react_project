import React, { useState, useEffect } from 'react'
import api from "../../api"
import { withRouter } from 'react-router-dom'
import ProductCard from "../../../components/ProductCard"
import "./index.css"
function ProductList() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const products = [
  //   { id: 2, img: "sadwwd", introduce: "asdasd", price_low: 23, price_top: 24, comment: "asdsa" }
  // ]



  useEffect(() => {
    async function fetchProducts() { 
      try {
        // 调用验证token的api
        const tokenResponse = await api.get('/api1/api/jwt.php');
        // console.log("tkne", tokenResponse)
        if (tokenResponse.status === 200) {
          // 如果token验证通过，则请求商品列表
          const productListResponse = await api.get('/api1/api/shopList.php');
          setProducts(productListResponse.data);
          setLoading(false);
        } else {
          // 如果token验证失败，则重定向到登录页
          // 清除本地token缓存
          localStorage.removeItem('token');
          setLoading(false);
          // 显示弹窗提示
          alert('您的登录已过期，请重新登录！');
          // 如果token验证失败，则重定向到登录页
          window.location.href = '/login';
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (

    <div className="main__inner-wrapper">
      <div className="g-bodyArea g-inner">
        <div className='g-main'>
          <section id="recommendProdComponentSection" className="g-block g-block_featured_products">
            {error && <p>{error}</p>}
            <h2 className="g-h-2">おすすめ商品</h2>
            <div className="g-sm-full g-carousel g-carousel-two-cols">
              <ul className="g-lg-grid-6 g-carousel_wrapper swiper-wrapper_cls" data-tmp-equalize-heights="">


                {products.map((item) => {
                  // console.log(item);
                  return (
                    <ProductCard key={item.id} product={item} />
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )

}

export default withRouter(ProductList);