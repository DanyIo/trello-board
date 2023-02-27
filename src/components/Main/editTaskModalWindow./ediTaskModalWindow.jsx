import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field } from "formik";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { changeTask } from "../../../features/task/taskSlice";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

export default function ChangeTaskModalWindow({ boardIndex, taskIndex }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  function validateTaskName(value) {
    let error;
    if (value.length > 15) {
      error = "Something shorter";
    }
    if (value.length === 0) {
      error = "Empty field";
    }
    return error;
  }
  return (
    <div>
      <IconButtonStyled
        aria-label="delete"
        id={taskIndex}
        onClick={() => handleOpen()}
      >
        <EditIconStyled id={taskIndex}></EditIconStyled>
      </IconButtonStyled>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter changed task
          </Typography>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={async ({ name }) => {
              const data = {
                title: name,
                boardIndex: boardIndex,
                taskIndex: taskIndex,
                date: Date.now(),
              };
              dispatch(changeTask(data));
              handleClose();
            }}
          >
            {({ errors, touched, isValidating }) => (
              <Form>
                <FieldStyled
                  name="name"
                  placeholder={"Task name"}
                  validate={validateTaskName}
                />
                <br />
                {errors.name && touched.name && (
                  <ErrorDivStyled style={{ color: "red", fontSize: "10px" }}>
                    {errors.name}
                  </ErrorDivStyled>
                )}
                <SendButtonStyled
                  variant="contained"
                  type="submit"
                  endIcon={<EditIcon />}
                >
                  Change
                </SendButtonStyled>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

const FieldStyled = styled(Field)(() => ({
  border: "1px solid #000",
  padding: 7,
  height: 25,
  marginTop: 15,
  marginLeft: 5,
  marginRight: 5,
}));
const SendButtonStyled = styled(Button)(() => ({
  background: "rgb(124, 252, 0)",
  color: "black",
  ":hover": {
    backgroundColor: "pink",
  },
  margin: 5,
  bottom: 0,
}));
const style = {
  position: "absolute",
  display: "block-cell",
  textAlign: "center",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 125,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const IconButtonStyled = styled(IconButton)(() => ({
  float: "right",
}));
const ErrorDivStyled = styled.div({
  color: "red",
  fontSize: "11px",
  padding: 5,
});

const EditIconStyled = styled(EditIcon)(() => ({
  float: "right",
  position: "absolute",
  color: "white",
}));
