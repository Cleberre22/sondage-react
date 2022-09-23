import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import MenuHeader from "../../../components/auth/MenuHeader";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PollIcon from "@mui/icons-material/Poll";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function ShowPoll() {
  const { answer } = useParams();
  const navigate = useNavigate();

  const [nameQuestion, setNameQuestion] = useState("");
  const [nameAnswer, setNameAnswer] = useState("");

  useEffect(() => {
    getAnswer();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getAnswer = async () => {
    await axios
      .get(`http://localhost:8000/api/answers/${answer}`)
      .then((res) => {
        setNameAnswer(res.data[0].nameAnswer);
        setNameQuestion(res.data[0].nameQuestion);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <MenuHeader />

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 18,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PollIcon />
            </Avatar>
            <Typography sx={{ mt: 0 }} component="h1" variant="h4">
              Fiche de la réponsen
            </Typography>
            <Box className="boxPoll">
              <p>{nameQuestion}aaaaaaaaaa</p>
              <br />
              <p>{nameAnswer}dddddddddd</p>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
