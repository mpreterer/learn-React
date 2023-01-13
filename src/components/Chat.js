import { Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData, collection } from "react-firebase-hooks/firestore";
import { Context } from "..";
import firebase from "firebase/compat/app";

const Chat = () => {
  const { auth, firestore } = React.useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    collection(firestore, "messages", orderBy, "createdAt")
  );

  const sendMessage = async () => {
    firestore.collection("message").add({
      uid: user.uid,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      text: value,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue('')
  };

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
        ></div>
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
