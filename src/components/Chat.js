import { Avatar, Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Context } from "..";
import { addDoc, FieldValue, orderBy, serverTimestamp } from "@firebase/firestore";
import Loader from "./Loader";

const Chat = () => {
  const { auth, firestore } = React.useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    collection(firestore, "messages"), orderBy('createdAt')
  )

  const sendMessage = async () => {
    const docRef = await addDoc(collection(firestore, "messages"), {
      user: user.displayName,
      message: value,
      createdAt: serverTimestamp(),
      photoURL: user.photoURL,
      uid: user.uid
    });
    setValue("");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: "10px" }}
        justify={"center"}
      >
        <div
          style={{
            width: "80%",
            height: "70vh",
            border: "1px dotted green",
            overflowY: "auto",
          }}
        >
          {messages.map((message) => (
            <div
              style={{
                margin: "10px",
                border:
                  user.uid === message.uid
                    ? "1px solid green"
                    : "1px solid grey",
                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                width: 'fit-content'
              }}
            >
              <Grid container>
                <Avatar src={message.photoURL}></Avatar>
                <div>{message.user}</div>
              </Grid>
              <div>{message.message}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignContent={"flex-end"}
          width={"80%"}
        >
          <TextField
            fullWidth
            rowsMax={2}
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Начать переписку"
          ></TextField>
          <Button onClick={sendMessage} variant="outlined">
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
