import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export default function ChatBox() {
  const [room, setRoom] = useState("1");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, sender: false, username: data.username },
      ]);
    });

    return () => socket.off("receive_message");
  }, [room, username]);

  const joinChatRoom = () => {
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRoomChange(e.target.value);
    }
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      console.log(room);
      const messageData = { message: currentMessage, room, username };
      socket.emit("send_message", messageData);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentMessage, sender: true },
      ]);

      setCurrentMessage("");
    }
  };
  const handleRoomChange = (newRoom) => {
    // Leave the current room
    socket.emit("leave_room", room);

    // Update room state and join new room
    setRoom(newRoom);
    socket.emit("join_room", newRoom);
  };
  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Member
          </h5>

          <MDBCard>
            <MDBCardBody>
              <MDBInput
                value={room}
                onChange={(e) => handleRoomChange(e.target.value)}
                onKeyUp={handleKeyPress}
                label="Enter Room ID"
                id="roomId"
                type="text"
              />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
          <h4>You Are currently at room : {room}</h4>
          <MDBTypography listUnStyled>
            <hr />
            {messages.map((message, index) => (
              <>
                {message.sender ? (
                  <li
                    key={index}
                    className="d-flex justify-content-between mb-4"
                  >
                    <MDBCard className="w-100">
                      <MDBCardHeader className="d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{username}</p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className="mb-0">{message.text}</p>
                      </MDBCardBody>
                    </MDBCard>
                    <img
                      src="/blank_profile.jpg"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                      width="60"
                    />
                  </li>
                ) : (
                  <li className="d-flex justify-content-between mb-4">
                    <img
                      src="/blank_profile.jpg"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                      width="60"
                    />
                    <MDBCard className="w-100">
                      <MDBCardHeader className="d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{message.username}</p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className="mb-0">{message.text}</p>
                      </MDBCardBody>
                    </MDBCard>
                  </li>
                )}
              </>
            ))}
            <li className="bg-white mb-3">
              <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={4}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
            </li>
            <MDBBtn
              onClick={handleSendMessage}
              color="info"
              rounded
              className="float-end"
            >
              Send
            </MDBBtn>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
