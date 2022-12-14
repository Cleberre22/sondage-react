import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import MenuHeader from "../../../components/auth/MenuHeader";
import Answer from "../../../components/sondage/Answer";

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


  const { poll } = useParams();
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPoll();
    displayQuestionPoll();
    displayAnswers();
  }, []);

  const [nameSondage, setNameSondage] = useState("");
  const [questions, setQuestion] = useState([]);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getPoll = async () => {
    await axios
      .get(`http://localhost:8000/api/polls/${poll}`)
      .then((res) => {
        setNameSondage(res.data.nameSondage);
        console.log(res.data.nameSondage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayQuestionPoll = async () => {
    await axios
      .get(`http://localhost:8000/api/question-poll/${poll}`)
      .then((res) => {
        setQuestion(res.data);
        console.log(res.data);
      });
  };

  const displayAnswers = async () => {
    await axios.get("http://localhost:8000/api/answers").then((res) => {
      setAnswers(res.data);
      console.log(res.data);
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
              Fiche du sondage: {nameSondage}
            </Typography>
            {questions.map((question) => (
              <div>
                <b>{question.nameQuestion}</b>
                <Answer question = {question}/>
              </div>
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
