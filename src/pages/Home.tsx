import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableNotes } from "../components/TableNotes";
import { useAppDispatch, useAppSelector } from "../store";
import { createNoteAction, listNotesAction } from "../store/modules/noteSlice";

export const Home: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const user = useAppSelector((user) => user.login);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      alert("Login is requerid");
      navigate("/login");
      return;
    }
    const userId = user._id;
    dispatch(listNotesAction(userId));
  }, [dispatch, navigate, user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateNote = () => {
    const note = {
      title,
      content,
    };
    const userId = user._id;
    dispatch(createNoteAction({ id: userId, note }));
    alert("Note created");
    setTitle("");
    setContent("");
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" fixed sx={{ paddingBottom: "20px" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "center", mt: "75px" }}
        >
          <Button variant="contained" onClick={handleClickOpen}>
            Add new task
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: "5px" }}>
            <Grid item xs={12}>
              <TextField
                onChange={(ev) => setTitle(ev.target.value)}
                label="Task"
                value={title || ""}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(ev) => setContent(ev.target.value)}
                label="Description"
                value={content || ""}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateNote}>Add</Button>
        </DialogActions>
      </Dialog>

      <Divider variant="middle" sx={{ my: "6px" }} />

      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Notes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableNotes />
      </Grid>
    </Container>
  );
};
