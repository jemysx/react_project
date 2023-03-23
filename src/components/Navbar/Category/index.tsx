import React, { useState, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import "./index.css";

interface Subcategory {
  id: number;
  title: string;
  // 其他属性...
}

interface CategoryData {
  id: number;
  title: string;
  subcategories: Subcategory[];
  // 其他属性...
}

interface CategoryProps{
    className?:string
}

// 创建一个 axios 实例
const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});
const  Category:React.FC<CategoryProps> = (props)=> {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);

  const [loading, setLoading] = useState(true);
  //发送请求

  useEffect(() => {
    // 获取数据的函数
    const fetchData = async () => {
      try {
        // 替换为实际的API URL
        const CategoryListResponse = await api.get(
          "/api1/api/CategoryList.php"
        );
        console.log("CategoryListResponse", CategoryListResponse);
        //    const data = await response.json();
        setCategoryList(CategoryListResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="g-gnav_category"
      onMouseEnter={() => {
        setIsActive(true);
      }}
      onMouseLeave={() => {
        setIsActive(false);
      }}
    >
      <div className="g-gnav_btn g-gnav_categoryBtn">
        <i className="g-s g-s-category"></i>
        <span className="kategodi">カテゴリ</span>
      </div>
      {isActive && (
        <>
          <div className="g-gcategory" data-breakpoints="wide">
            <ul
              className="g-gcategory_el"
              data-accordion-group
              data-accordion-group-active="true"
            >
              {categoryList.map((category, index) => (
                <li key={index} onMouseEnter={() => setActiveIndex(index)}>
                  <div className="g-gcategory_head">
                    <a
                      href=""
                      className={`g-gcategory_name${
                        index === activeIndex ? " active" : ""
                      }`}
                    >
                      <span>{category.title}</span>
                    </a>
                  </div>

                  <CategoryItem category={categoryList[activeIndex]} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Category;
export { CategoryData,Subcategory };
