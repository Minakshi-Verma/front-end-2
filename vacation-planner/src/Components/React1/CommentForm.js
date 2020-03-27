import React, {useState} from 'react';
import Comment from './Comments'




const CommentForm = () => {

//setting uo the initial useState    
const [post, setPost] = useState({
   
    username:"",
    comment: ""
})
 //new use state with dummydata
const [posts, setPosts] = useState([
    {
    id: 1,
    user_name: "Riya Wilson",
    comment_value: "Thanks so much to Vacation Planner for helping me plan a great holiday. We went to Maui and Kauai and we knew everthing about the place and activities to enjoy! I must say, Vacation Planner is the best vacation adviser planner :-)"
    }

    ])


// onChange handler 
const handleChanges =(e) => {
setPost({...post, [e.target.name]: e.target.value})
}

//submitForm function

const submitForm = (e) => {
e.preventDefault();
addNewComment(post)
setPost({username:"", comment:""})
}
// addPost function that will updates(adds) the posts

const addNewComment = (post) => {
    const newPost = {
        id: post.id,
        username: post.user_name,
        comment: post.comment_value        
    }
    setPosts([...posts, newPost])
  }


    return(

        <div>
        
        <form className = "form" onSubmit = {submitForm}>
            {/* <label htmlFor = 'username'>Username</label> */}
            <label htmlFor = 'username'></label>
            <input className = "input"
            id = "username"
            type = "text"
            name = "username"
            onChange = {handleChanges}
            placeholder = "Name here"
            value = {post.username}
            />

            {/* <label htmlFor = 'comment'>comment</label> */}
            <label htmlFor = 'comment'></label>
            <textarea className = "input"
            id = "comment"            
            name = "comment"
            onChange = {handleChanges}
            placeholder = "Type you comment here!"
            value = {post.comment}
            />
            <button className ="commentbutton" type = "submit">Submit</button>
        </form>
      
        {posts.map(post =>(
            <Comment key = {post.id}
            username= {post.user_name}
            comment= {post.comment_value} />

        ))} 

        </div>
         
    )

}


export default CommentForm;