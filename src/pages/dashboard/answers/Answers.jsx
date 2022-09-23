import React, { useEffect, useState } from "react";
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function IndexPoll() {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  

  useEffect(() => {
    displayQuestions();
    displayAnswers();
  }, []); // Sans les crochets ça tourne en boucle

  const displayAnswers = async () => {
    await axios.get("http://localhost:8000/api/answers").then((res) => {
      setAnswers(res.data);
      console.log(res.data);
    });
  };

  const deleteAnswer = (id) => {
    axios.delete(`http://localhost:8000/api/answers/${id}`).then(displayAnswers);
  };

  const displayQuestions = async () => {
    await axios.get("http://localhost:8000/api/questions").then((res) => {
      setQuestions(res.data);
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
            <Typography component="h1" variant="h4">
              Liste des réponses
            </Typography>
            <Box sx={{ mt: 1 }}>






            <Button sx={{ mt: 5 }} variant="contained" href="/dashboard/answers/add">
  Créer réponse
</Button>



              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      {/* <TableCell align="center">Sondage</TableCell> */}
                      <TableCell align="center">Question</TableCell>
                      <TableCell align="center">Réponse</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {answers.map((answer) => (
                      <TableRow
                        key={answer.nameAnswer}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {answer.id}
                        </TableCell>
                        <TableCell align="center">{answer.nameQuestion}</TableCell>
                        <TableCell align="center">{answer.nameAnswer}</TableCell>
                        <TableCell align="center">

                        <IconButton
                            color="success"
                            aria-label="show"
                            size="large"
                            href={`/dashboard/answers/show/${answer.id}`}
                          >
                            <VisibilityIcon fontSize="inherit" />
                          </IconButton>

                          <IconButton
                            color="primary"
                            aria-label="edit"
                            size="large"
                            href={`/dashboard/answers/edit/${answer.id}`}
                          >
                            <ModeEditIcon fontSize="inherit" />
                          </IconButton>

                          <IconButton
                            color="error"
                            aria-label="delete"
                            size="large"
                            onClick={() => {
                              deleteAnswer(answer.id);
                            }}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
