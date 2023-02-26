import styled from "@emotion/styled";

import DashboardIcon from "@mui/icons-material/Dashboard";

import BasicModal from "./ModalWindow/modalWindow";
const Header = () => {

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
