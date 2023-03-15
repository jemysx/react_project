import React from 'react'
import { withRouter } from 'react-router-dom'

function ProductDetail(props){

  console.log('props',props)
    return (
      <div>
        我是详情页
        
      </div>
    )
  
}

export default withRouter(ProductDetail)