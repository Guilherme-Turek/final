import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../store";
import {
  deleteNoteAction,
  getAllNotes,
  getNoteById,
  UptadeNoteAction,
} from "../store/modules/noteSlice";
import { Note } from "../services/api.service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const TableNotes: React.FC = () => {
  const user = useAppSelector((user) => user.login);
  const notes = useAppSelector((state) => getAllNotes(state.notes));
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDeleteNote = async (note: Note) => {
    const data = {
      id: user._id,
      noteId: note._id,
    };
    console.log(data.id);
    console.log(data.noteId);

    const result = await dispatch(deleteNoteAction(data));

    if (result) {
      alert("Note erased");
      return;
    }
    alert("Deu ruim");
  };

  const handleClickOpen = (note: Note) => {
    setOpen(true);
    setTitle(note._title);
    setContent(note._content);
    setStatus(note._status);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateNote = async () => {};

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => (
              <TableRow
                key={note?._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {note?._title}
                </TableCell>
                <TableCell align="right">{note?._content}</TableCell>
                <TableCell align="right">{note?._status}</TableCell>
                <TableCell align="right">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleClickOpen(note)}
                    sx={{ paddingRight: "20px" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteNote(note)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Container maxWidth="lg" fixed sx={{ paddingBottom: "20px" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", mt: "75px" }}
          ></Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Task</DialogTitle>
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
                  label="Content"
                  value={content || ""}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={"filed"}>Filed</MenuItem>
                      <MenuItem value={"active"}>Active</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateNote}>Add</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};
