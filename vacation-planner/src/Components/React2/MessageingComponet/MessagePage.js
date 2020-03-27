import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../Utilities/AxiosWithAuth";
import { AMesssage } from "./AMesssage";

export const MessagePage = props => {
  const [allUserMsg, setAllUserMsg] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [update, setupdate] = useState(false);

  const [message, setMessage] = useState({
    message: "",
    user_id: Number(localStorage.getItem("userid")),
    receiver_id: null,
    sender: true,
    receiver: false
  });

  console.log("MSG", message);
  useEffect(() => {
    axiosWithAuth()
      .get(`users/${localStorage.getItem("userid")}/messages`)
      .then(res => {
        setAllUserMsg(res.data);
        console.log("ALL_USER_MSG", res.data);
      })
      .catch(err => console.log(err));
  }, [update]);

  useEffect(() => {
    axiosWithAuth()
      .get("/users")
      .then(res => {
        setAllUsers(res.data.users);
      })
      .catch(err => console.log(err));
  }, [update]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("SENDER", senderName);
    const person = allUsers.find(ele => ele.user_name === senderName);
    console.log("ALLPEEPS:", allUsers);
    console.log("PERSON:", person.user_id);
    setMessage({ ...message, receiver_id: person.user_id });
    const newMsg = { ...message, receiver_id: person.user_id };

    if (person) {
      console.log("POST msg:", message);

      axiosWithAuth()
        .post("/messages", newMsg)
        .then(res => {
          console.log("SENT_MESSAGE", res);

          setupdate(!update);
        })
        .catch(err => console.log(err));
    }
  };
  const handleChange = e => {
    e.preventDefault();
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="commentBtn"
          placeholder="Enter Persons name"
          type="text"
          name="receiver_name"
          onChange={e => {
            setSenderName(e.target.value);
          }}
        />
        <input
          className="commentBtn"
          placeholder="Type a message"
          value={message.message}
          name="message"
          onChange={handleChange}
        />
        <button className="mediumButton" type="submit">
          Send
        </button>
      </form>
      {allUserMsg.map((ele, index) => (
        <AMesssage allPeeps={allUsers} key={index} item={ele} />
      ))}
    </div>
  );
};
