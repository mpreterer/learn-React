import { Button, Grid, Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext } from "react";
import { Context } from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(user, token)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={"center"}
        justify={"center"}
      >
        <Grid
          style={{
            color: "#fff",
            width: "500px",
            aligntItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Box p={4}>
            <Button onClick={login} variant="outlined">
              Войти через Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
