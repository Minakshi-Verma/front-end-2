import React from "react";


const Comment =(props) =>{  
    
    return (
        <div className ="comments">          
                <h3>{props.username}</h3>
                <p>{props.comment}</p>   
                     
        </div>
    )

}

export default Comment;