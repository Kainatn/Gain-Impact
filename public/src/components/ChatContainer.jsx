// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import ChatInput from "./ChatInput";
// import Logout from "./Logout";
// import { v4 as uuidv4 } from "uuid";
// import axios from "axios";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import moment from "moment";
// export default function ChatContainer({ currentChat, socket }) {
//   const [messages, setMessages] = useState([]);
//   const scrollRef = useRef();
//   const [arrivalMessage, setArrivalMessage] = useState(null);

//   useEffect(async () => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     const response = await axios.post(recieveMessageRoute, {
//       from: data._id,
//       to: currentChat._id,
//     });
//     setMessages(response.data);
//   }, [currentChat]);

//   useEffect(() => {
//     const getCurrentChat = async () => {
//       if (currentChat) {
//         await JSON.parse(
//           localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//         )._id;
//       }
//     };
//     getCurrentChat();
//   }, [currentChat]);

//   const handleSendMsg = async (msg) => {
//     const data = await JSON.parse(
//       localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
//     );
//     socket.current.emit("send-msg", {
//       to: currentChat._id,
//       from: data._id,
//       msg,
//     });
//     await axios.post(sendMessageRoute, {
//       from: data._id,
//       to: currentChat._id,
//       message: msg,
//     });

//     const msgs = [...messages];
//     msgs.push({ fromSelf: true, message: msg });
//     setMessages(msgs);
//   };

//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("msg-recieve", (msg) => {
//         setArrivalMessage({ fromSelf: false, message: msg });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Container>
//       <div className="user-details"></div>
//       <div className="messagess">
//         <div className="users">
//           <div className="username">
//             <h3>{currentChat.username}</h3>
//           </div>
//           <div className="avatar">
//             <img
//               src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
//               alt=""
//             />
//           </div>
//         </div>
//         <div>
//           {messages.map((message) => {
//             console.log("----------------", message.createdAt);
//             return (
//               <div ref={scrollRef} key={uuidv4()}>
//                 <div
//                   className={`message ${
//                     message.fromSelf ? "sended" : "recieved"
//                   }`}
//                 >
//                   <div
//                     className={`content ${
//                       message.fromSelf ? "sendedContent" : "recievedContent"
//                     }`}
//                   >
//                     <p>{message.message}</p>
//                     <span
//                       className={`time ${
//                         message.fromSelf ? "sendedTime" : "recievedTime"
//                       }`}
//                     >
//                       {moment.utc(message.createdAt).format("HH:mm")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <ChatInput handleSendMsg={handleSendMsg} />
//     </Container>
//   );
// }

// const Container = styled.div`
//   .users {
//     width: 50px;

//     .username {
//       margin-top: -22px;
//       h3 {
//         font-weight: 400;
//         color: black;
//         font-size: 15px;
//         color: black;
//       }
//     }
//   }
//   span {
//     padding: 7px;
//     position: absolute;
//     font-size: 11px;
//     bottom: 0;
//     right: 0;
//   }
//   .recievedTime {
//     // justify-content: flex-start;
//     color: rgba(95, 127, 222, 255);
//   }
//   .sendedTime {
//     color: white;
//   }
//   p {
//     padding-bottom: 5px;
//     font-weight: 350;
//     font-size: 14px;
//   }
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .messagess {
//     justify-content: flex-end;
//     display: flex;
//     padding: 20px;
//   }

//   .avatar {
//     img {
//       border: 3px solid #fdba45;
//       border-radius: 50%;
//       height: 2.5rem;
//       background: #fdba45;
//     }
//   }
//   .user-details {
//     padding: 10px;
//     align-items: center;
//     gap: 1rem;
//     .avatar {
//       width: 50px;
//       img {
//         border: 3px solid #fdba45;
//         border-radius: 50%;
//         height: 2.5rem;
//         background: #fdba45;
//       }
//     }
//   }

//   &::-webkit-scrollbar {
//     width: 0.2rem;
//     &-thumb {
//       background-color: white;
//       width: 0.1rem;
//       border-radius: 1rem;
//     }
//   }
//   .message {
//     padding: 5px;
//     display: flex;
//     align-items: center;
//     .sendedContent {
//       border-top-left-radius: 0.8rem;
//       border-bottom-right-radius: 0.8rem;
//       border-bottom-left-radius: 0.8rem;
//     }

//     .recievedContent {
//       border-top-right-radius: 0.8rem;
//       border-bottom-right-radius: 0.8rem;
//       border-bottom-left-radius: 0.8rem;
//     }
//     .content {
//       overflow-wrap: break-word;
//       padding: 1rem;
//       position: relative;
//       font-size: 1.1rem;
//       @media screen and (min-width: 720px) and (max-width: 1080px) {
//         max-width: 70%;
//       }
//     }
//   }
//   .sended {
//     justify-content: flex-end;
//     .content {
//       color: white;
//       background-color: #fdba45;
//     }
//   }
//   .recieved {
//     justify-content: flex-start;
//     .content {
//       background-color: #def7fd;
//     }
//   }
// `;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header"></div>
      <div className="chat-messages">
      {/* <div className="users">
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
        </div> */}
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div
                  className={`content ${
                    message.fromSelf ? "sendedContent" : "recievedContent"
                  }`}
                >
                  <p>{message.message}</p>
                  <span
                    className={`time ${
                      message.fromSelf ? "sendedTime" : "recievedTime"
                    }`}
                  >
                    {moment(message.createdAt).format("HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .recievedTime {
    justify-content: flex-start;
    padding-right: 10px;
    right: 0;
    color: rgba(95, 127, 222, 255);
  }
  .sendedTime {
    color: white;
  }
  .time {
    position: absolute;
    font-size: 11px;
    padding-top: 1px;
  }
  p {
    font-size: 14px;
    font-weight: 300;
    padding: 2px;
  }
  .avatar {
    img {
      height: 3rem;
    }
  }
  .username {
    h3 {
      color: black;
    }
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
  
    }
  }
  .chat-messages {
    align-self: flex-end;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .sendedContent {
        border-top-left-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
      }

      .recievedContent {
        border-top-right-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;
        border-bottom-left-radius: 0.8rem;
      }
      .content {
        position: relative;
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        color: white;
        background-color: #fdba45;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        color: black;
        background-color: #def7fd;
      }
    }
  }
`;
