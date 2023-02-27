import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field } from "formik";
import styled from "@emotion/styled";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { useDispatch } from "react-redux";
import { addTaskList } from "../../../features/task/taskSlice";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  return (
    <div>
      <ButtonStyled
        variant="contained"
        endIcon={<AddCircleOutlinedIcon icon={faInfo} />}
        onClick={() => {
          handleOpen();
        }}
      >
        Add list
      </ButtonStyled>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What is the task list name?
          </Typography>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={({ name }) => {
              dispatch(addTaskList(name));
              handleClose();
            }}
          >
            {() => (
              <Form>
                <FieldStyled name="name" placeholder={"Name"} />
                <SendButtonStyled
                  variant="contained"
                  type="submit"
                  endIcon={<LibraryAddCheckIcon />}
                >
                  Add
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ButtonStyled = styled(Button)(() => ({
  background: "white",
  marginRight: "30px",
  color: "black",
  ":hover": {
    backgroundColor: "orange",
  },
}));
