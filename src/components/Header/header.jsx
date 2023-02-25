import styled from "@emotion/styled";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Button from "@mui/material/Button";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch } from "react-redux";
import { addTaskList } from "../../features/task/taskSlice";
import { useState } from "react";
import BasicModal from "./ModalWindow/modalWindow";
const Header = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <HeaderStyled>
        <DashboardIconStyled />
        <TitleStyled>Trello</TitleStyled>
        <BasicModal />
      </HeaderStyled>
    </div>
  );
};

const HeaderStyled = styled.div({
  height: "10vh",
  padding: "0 15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "black",
  marginBottom: "50px",
});
const ButtonStyled = styled(Button)(() => ({
  background: "white",
  marginRight: "30px",
  color: "black",
  ":hover": {
    backgroundColor: "orange",
  },
}));
const DashboardIconStyled = styled(DashboardIcon)(() => ({
  color: "white",
  marginLeft: "30px",
}));
const TitleStyled = styled.h1({
  textAlign: "center",
  fontFamily: "Monsterrat Bold",
  color: "white",
});
export default Header;
