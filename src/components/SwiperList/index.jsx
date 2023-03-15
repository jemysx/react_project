import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './index.css'

// Install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const MySwiper = () => {
    // const [slides, setSlides] = useState([]);

    // const products = [
    //     { id: 1, img: 'https://www.nitori-net.jp/ecstatic/include/feature/img19/bed-combine/bed/chest/TopTk_bnr_cmpc.jpg', links: "http://www.baidu.com" },
    //     { id: 2, img: 'https://www.nitori-net.jp/ecstatic/include/feature/img21/rakukaji/TopTk_bnr_cmpc.jpg', links: "http://www.baidu.com" },
    //     { id: 3, img: 'https://www.nitori-net.jp/ecstatic/include/feature/img21/pollengoods/TopTk_bnr_pc.jpg', links: "/home/productList/productDetail" }
    // ];

    // 创建一个 axios 实例
    const api = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 1000
    });
    //发送请求
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // 获取数据的函数
        const fetchData = async () => {
            try {
                // 替换为实际的API URL
                const SwiperListResponse = await api.get('/api1/api/SwiperList.php');
                console.log('SwiperList',SwiperListResponse)
                //    const data = await response.json();
                   setSlides(SwiperListResponse.data);
                   setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    if (loading) {
        return <p>Loading...</p>;
      }


    const isExternalLink = (url) => /^https?:\/\//.test(url);
    return (

        <div className="slide_feature" role="toolbar">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="slide_feture_ul slick-initialized slick-slider"
            >
                <div className="slide-arrow prev-arrow slick-arrow" >
                    <i className="g-i g-i-arrow-l" aria-hidden="true"></i>
                </div>
                <div aria-live="polite" className="slick-list draggable" style={{ padding: "0px 10%" }}>
                    <div className="slick-track" role="listbox" style={{ opacity: 1, width: "9600px", left: "-1920px" }}>

                        {slides.map((slide) => (
                            <SwiperSlide key={slide.id} className="slide_feture_li">

                                {isExternalLink(slide.link) ? (
                                    <a
                                        className={`slide_link slide_link${slide.id}`}
                                        href={slide.link}
                                        tabIndex="0"
                                    >
                                        <img src={slide.image_url} alt={slide.alt} />

                                    </a>
                                ) : (
                                    <Link to={slide.link} className={`slide_link slide_link${slide.id}`}>
                                        <img src={slide.image_url} alt={slide.alt} />
                                    </Link>
                                )}
                            </SwiperSlide>
                        ))}
                    </div>
                </div>
            </Swiper>

        </div>


    );
};

export default MySwiper;