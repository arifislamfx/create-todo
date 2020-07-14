import React from "react";
import "./Todo.css";
import { ListItem, ListItemText, Button, TextField } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "../../firebase";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const Todo = (props) => {
  const [input, setInput] = useState("");

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteTodo = () => {
    db.collection("todos").doc(props.todo.id).delete();
  };

  const handleUpdate = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <div>
      <div className="todo-list">
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="Deadline" />
        </ListItem>
        <div>
          <Button
            type="button"
            onClick={handleOpen}
            size="small"
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </div>
        <div>
          <DeleteForeverIcon
            onClick={handleDeleteTodo}
            style={{ cursor: "pointer" }}
          ></DeleteForeverIcon>
        </div>

        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="spring-modal-title">Update your todo</h2>
              <p id="spring-modal-description">
                {" "}
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={props.todo.todo}
                ></TextField>{" "}
              </p>
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
