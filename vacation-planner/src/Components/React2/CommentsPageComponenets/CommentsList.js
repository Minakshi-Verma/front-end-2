import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "../../Utilities/AxiosWithAuth";
import { Comments } from "./Comments";

export const CommentsList = props => {
  const [isaddingComment, setIsAddingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isEditing, setIsediting] = useState(false);
  const initState = {
    comment: "",
    vacation_id: props.id,
    user_id: localStorage.getItem("userid")
  };
  const [commentToAdd, setCommentToAdd] = useState(initState);

  useEffect(() => {
    axiosWithAuth()
      .get(`/vacations/${props.id}/comments`)
      .then(res => {
        console.log("COMMENT_RES", res);
        setComments([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [update]);

  const handleDelete = id => {
    axiosWithAuth()
      .delete(`comments/${id}`)
      .then(res => {
        setUpdate(!update);
      })
      .catch(err => console.log(err));
  };

  const handleEdit = item => {
    setIsediting(true);
    setIsAddingComment(true);
    setCommentToAdd(item);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEditing) {
      console.log("EDIT_COMMNET", commentToAdd);

      axiosWithAuth()
        .put(`comments/${commentToAdd.comment_id}`, commentToAdd)
        .then(res => {
          setIsediting(false);
          setIsAddingComment(false);
          setCommentToAdd(initState);
          setUpdate(!update);
        })
        .catch(err => console.log(err));
    } else {
      console.log("COMMENT_SENT", commentToAdd);
      axiosWithAuth()
        .post("/comments", commentToAdd)
        .then(res => {
          console.log("COMMENT_ADD_RES", res);
          setCommentToAdd(initState);
          setIsAddingComment(!isaddingComment);
          setUpdate(!update);
        })
        .catch(err => console.log(err));
    }
  };

  const handleChange = e => {
    e.preventDefault();
    setCommentToAdd({ ...commentToAdd, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button class ="mediumButton" onClick={() => console.log("LOGIT", comments)}>LogIt</button>
      {isaddingComment ? (
        <>
          <form onSubmit={handleSubmit}>
            <input className = "commentBtn"
              onChange={handleChange}
              type="text"
              name="comment"
              value={commentToAdd.comment}
              required
            />
            <button className = "mediumButton" type="submit">Send</button>
            <button className ="largeButton"
              onClick={() => {
                setIsAddingComment(false);
                setCommentToAdd(initState);
              }}
            >
              Cancel
            </button>
          </form>
        </>
      ) : (
        <button class ="commentBtn"
          onClick={() => {
            setIsAddingComment(true);
          }}
        >
          Add Comment
        </button>
      )}
      {!comments ? (
        <h3>Add a comment</h3>
      ) : (
        <div>
          {comments.map((ele, index) => (
            <Comments
              key={index}
              edit={handleEdit}
              delete={handleDelete}
              item={ele}
            />
          ))}
        </div>
      )}
    </div>
  );
};
