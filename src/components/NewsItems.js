import React from 'react'

const NewsItems =(props)=> {
    let {title,description,imageUrl,newUrl,author,date,source} = props;
    return (
      <div>
        <div className="card" style={{width: "25rem"}}>
          <div style={{display:"flex" ,justifyContent:"flex-end" , right:"0", position:"absolute"}}>

            <span className="badge rounded-pill bg-danger" >
              {source}
            </span>

          </div>
            <img src={!imageUrl?"https://library.ceu.edu/wp-content/uploads/news-2444778_960_720.jpg":imageUrl} className="card-img-top" style={{height:"12rem",width:"25rem"}} alt="..."/>
            <div className="card-body" style={{width:"25rem"}}>
                <h5 className="card-title" style={{width:"25rem"}}>{title}</h5>
                <p className="card-text" style={{width:"25rem"}}>{description}/</p>
                <p className="card-text" ><small className="text-muted" >By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
            </div>
            </div>
            
      </div>
    )
}

export default NewsItems
