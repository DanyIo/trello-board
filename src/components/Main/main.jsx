import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  selectTaskList,
  removeTask,
  addDraggedElement,
  addTask,
} from "../../features/task/taskSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskModalWindow from "./taskModalWindow/taskModalWindow";
const Main = () => {
  const tasksList = useSelector(selectTaskList);
  const dispatch = useDispatch();
  const [currentBoard, setCurrentBoard] = useState();
  const [currentTask, setCurrentTask] = useState();

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === "sc-dkrFOg dHkZkE Item") {
      e.target.style.boxShadow = "0 4px 7px gray";
    }
  }
  function onDragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
  }
  function onDragStartHandler(e, boardIndex, taskIndex) {
    setCurrentBoard(boardIndex);
    setCurrentTask(taskIndex);
  }
  function onDragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }
  function onDropHandler(e, boardIndex, taskIndex) {
    e.preventDefault();
    e.target.style.boxShadow = "none";

    dispatch(
      removeTask({
        boardIndex: currentBoard,
        taskIndex: currentTask,
      })
    );
    dispatch(
      addDraggedElement({
        boardIndex: boardIndex,
        taskIndex: taskIndex,
        item: tasksList[currentBoard].tasks[currentTask],
      })
    );
  }
  function dropCardHandler(e, boardIndex) {
    if (tasksList[boardIndex].tasks.length === 0) {
      dispatch(
        removeTask({
          boardIndex: currentBoard,
          taskIndex: currentTask,
        })
      );
      console.log(tasksList[currentBoard].tasks[currentTask], boardIndex);
      dispatch(
        addTask({
          name: tasksList[currentBoard].tasks[currentTask],
          index: boardIndex,
        })
      );
    }
  }
  return (
    <MainDivStyled>
      {Object.keys(tasksList).map((list, boardIndex) => {
        return (
          <TaskBoardStyled
            key={`${list}_${boardIndex}`}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, boardIndex)}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{tasksList[list].name}</strong>
              <TaskModalWindow index={boardIndex} />
            </div>
            <div></div>
            {tasksList[list].tasks.length > 0 &&
              tasksList[list].tasks.map((task, taskIndex) => {
                return (
                  <TaskStyled
                    className={"Item"}
                    key={`${task}_${taskIndex}`}
                    draggable={true}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => onDragLeaveHandler(e)}
                    onDragStart={(e) =>
                      onDragStartHandler(e, boardIndex, taskIndex)
                    }
                    onDragEnd={(e) => onDragEndHandler(e)}
                    onDrop={(e) => onDropHandler(e, boardIndex, taskIndex)}
                  >
                    {task}{" "}
                    <IconButtonStyled
                      aria-label="delete"
                      id={taskIndex}
                      onClick={() =>
                        dispatch(
                          removeTask({
                            boardIndex: boardIndex,
                            taskIndex: taskIndex,
                          })
                        )
                      }
                    >
                      <DeleteIconStyled id={taskIndex}></DeleteIconStyled>
                    </IconButtonStyled>
                  </TaskStyled>
                );
              })}
          </TaskBoardStyled>
        );
      })}
    </MainDivStyled>
  );
};

const MainDivStyled = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});
const TaskBoardStyled = styled.div({
  padding: "20px",
  height: "20%",
  width: "15%",
  background: "white",
  boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
  borderRadius: "20px",
  textAlign: "center",
  display: "table-cell",
  verticalAlign: "middle",
  margin: "20px",
});
const TaskStyled = styled.div({
  backgroundColor: "black",
  color: "white",
  padding: "20px",
  marginTop: "25px",
  borderRadius: "10px",
  justifyContent: "space-between",
  display: "flex",
});

const IconButtonStyled = styled(IconButton)(() => ({
  float: "right",
  position: "absolute",
}));
const DeleteIconStyled = styled(DeleteIcon)(() => ({
  float: "right",
  position: "absolute",
  color: "white",
}));

export default Main;
