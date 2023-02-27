import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { sortTasks } from "../../features/task/taskSlice";
import SortIcon from "@mui/icons-material/Sort";
import { useSelector, useDispatch } from "react-redux";

import BasicModal from "./ModalWindow/modalWindow";
const Header = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <HeaderStyled>
        <DashboardIconStyled />
        <TitleStyled>Trello</TitleStyled>
        <div
          style={{
            display: "flex",
            marginRight: 30,
            justifyContent: "space-around",
          }}
        >
          <BasicModal />
          <IconButtonStyled onClick={() => dispatch(sortTasks())}>
            <SortIconStyled />
          </IconButtonStyled>
        </div>
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

const DashboardIconStyled = styled(DashboardIcon)(() => ({
  color: "white",
  marginLeft: "30px",
}));
const TitleStyled = styled.h1({
  textAlign: "center",
  fontFamily: "Monsterrat Bold",
  color: "white",
});
const SortIconStyled = styled(SortIcon)(() => ({
  color: "white",
  position: "absolute",
}));
const IconButtonStyled = styled(IconButton)(() => ({
  float: "right",
}));
export default Header;
