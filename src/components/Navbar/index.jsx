import React from 'react'
import Category from './Category'
import styled from 'styled-components'
import './index.css'


function Navibar() {

  return (
    <div className="navbar-container">
      {/* 其他导航栏内容 */}

      <Category className="category-menu" />

    </div>


  )

}

export default Navibar