import React from 'react'

const Image = (props) => {

  return (
    <div onClick={props.onImageClickListener}>
      <img src={`https://via.placeholder.com/200x200?text=${props.serial}`} style={{backgroundSize:'cover',width:'100%',display:'flex'}} />
    </div>
  )
}
export default Image;
