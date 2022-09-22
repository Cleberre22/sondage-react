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
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignIn() {
    const { poll } = useParams();
  const navigate = useNavigate();

  const [nameSondage, setNameSondage] = useState("");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getPoll();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getPoll = async () => {
    await axios
      .get(`http://localhost:8000/api/polls/${poll}`)
      .then((res) => {
        setNameSondage(res.data.nameSondage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Fonction d'édition du sondage
  const EditPoll = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("nameSondage", nameSondage);

    await axios
      .post(`http://localhost:8000/api/polls/${poll}`, formData)
      .then(navigate("/dashboard/polls"))
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
            <Box component="form" onSubmit={EditPoll} noValidate sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Nom du sondage"
                name="nameSondage"
                autoComplete="email"
                autoFocus
                type="text"
                value={nameSondage}
                onChange={(event) => {
                  setNameSondage(event.target.value);
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
