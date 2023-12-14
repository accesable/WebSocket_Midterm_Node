import React, { useState } from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBContainer,
} from "mdb-react-ui-kit";

export default function Login({onLogin}) {
  const [username,setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your login logic here
    onLogin(username);
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol></MDBCol>
        <MDBCol>
          <h3>Chat With Stranger</h3>
          <form onSubmit={handleSubmit}>
            <MDBInput
              className="mb-4"
              type="text"
              id="form1Example1"
              label="Enter You User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBBtn type="submit" block>
              Go To Chat
            </MDBBtn>
          </form>
        </MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
