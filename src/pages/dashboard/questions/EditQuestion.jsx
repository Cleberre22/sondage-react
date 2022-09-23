import React, { useState, useEffect  } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignIn() {
  const { question } = useParams();
  const navigate = useNavigate();

  const [nameQuestion, setNameQuestion] = useState("");
  const [polls_id, setPolls_id] = useState("");
  const [polls, setPolls] = useState([]);
  const [nameSondage, setNameSondage] = useState([]);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getPolls();
    getQuestion();
  }, []);

    //Méthode pour récupérer les sondages
    const getPolls = async () => {
      await axios.get("http://localhost:8000/api/polls").then((res) => {
        setPolls(res.data);
      });
    };

    const handleChange = (event) => {
      setPolls_id(event.target.value);
    };

  // GET - Récupère les valeurs de la fiche avec l'API
  const getQuestion = async () => {
    await axios
      .get(`http://localhost:8000/api/questions/${question}`)
      .then((res) => {
        console.log(res.data[0]);
        setNameQuestion(res.data[0].nameQuestion);
        setPolls_id(res.data[0].polls_id);
        setNameSondage(res.data[0].nameSondage)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'édition de la question
  const EditQuestion = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nameSondage", nameSondage);
    formData.append("polls_id", polls_id);
    formData.append("nameQuestion", nameQuestion);

    await axios
      .post(`http://localhost:8000/api/questions/${question}`, formData)
      .then(navigate("/dashboard/questions"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
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
            {Object.keys(validationError).length > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="alert alert-danger">
                    <ul className="mb-0">
                      {Object.entries(validationError).map(([key, value]) => (
                        <li key={key}>{value}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PollIcon />
            </Avatar>
            <Typography sx={{ mt: 0 }} component="h1" variant="h4">
              Modifier le sondage
            </Typography>
            <Box component="form" onSubmit={EditQuestion} noValidate sx={{ mt: 3 }}>


            <Box sx={{ minWidth: 190 }}>
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    Choisir le sondage
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={polls.nameSondage}
                    label="Nom de la question"
                    onChange={handleChange}
                  >
                    {polls.map((poll) => (
                      <MenuItem key={poll.id} value={poll.id}>
                        {poll.nameSondage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Nom de la question"
                name="nameSondage"
                autoComplete="email"
                autoFocus
                type="text"
                value={nameQuestion}
                onChange={(event) => {
                  setNameQuestion(event.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Modifier
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
