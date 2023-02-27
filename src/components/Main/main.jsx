import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  selectTaskList,
  removeTask,
  addDraggedElement,
  addTask,
  fetchTask,
  getTasks,
  removeBoard,
  selectError,
  selectStatus,
} from "../../features/task/taskSlice";
import IconButton from "@mui/material/IconButton";
import Loader from "./Loader/loader";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskModalWindow from "./taskModalWindow/taskModalWindow";
import ChangeTaskModalWindow from "./editTaskModalWindow./ediTaskModalWindow";
const Main = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const tasksList = useSelector(selectTaskList);
  const [currentBoard, setCurrentBoard] = useState();
  const [currentTask, setCurrentTask] = useState();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    console.log("tasksList",tasksList);
    if(status !== "idle"){
      dispatch(fetchTask({ tasksList: tasksList }));
    }
  });
  {
    console.log(error, status);
  }
  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className.includes("Item")) {
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
        date: 0,
        name: tasksList[currentBoard].tasks[currentTask],
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
      dispatch(
        addTask({
          name: tasksList[currentBoard].tasks[currentTask],
          index: boardIndex,
        })
      );
    }
  }
  function showTime(ms) {
    if ((Date.now() - ms) / 1000 < 60) {
      return `${((Date.now() - ms) / 1000).toFixed(0)} sec ago`;
    } else if ((Date.now() - ms) / 60000 < 60) {
      return `${((Date.now() - ms) / 60000).toFixed(0)} min ago`;
    } else {
      return `${((Date.now() - ms) / 3600000).toFixed(0)} hours ago`;
    }
  }
  return (
    <MainDivStyled>
      { status === "succeeded" ?  Object.keys(tasksList).map((list, boardIndex) => {
        return (
          <TaskBoardStyled
            key={`${list}_${boardIndex}`}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, boardIndex)}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {tasksList[list].tasks.length === 0 && (
                <IconButtonStyled
                  aria-label="delete"
                  id={boardIndex}
                  onClick={() =>
                    dispatch(
                      removeBoard({
                        boardIndex: boardIndex,
                      })
                    )
                  }
                >
                  <RemoveIconStyled id={boardIndex}></RemoveIconStyled>
                </IconButtonStyled>
              )}
              <strong>{tasksList[list].name}</strong>
              <TaskModalWindow index={boardIndex} />
            </div>
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
                    <ChangeTaskModalWindow
                      boardIndex={boardIndex}
                      taskIndex={taskIndex}
                    />
                    {task.title}
                    <div style={{ fontSize: "10px", color: "gray" }}>
                      {showTime(task.date)}
                    </div>
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
      }): <CenterLoader><Loader></Loader></CenterLoader>} 
    </MainDivStyled>
  );
};

const MainDivStyled = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
});
const RemoveIconStyled = styled(RemoveIcon)(() => ({
  color: "black",
  position: "absolute",
}));
const TaskBoardStyled = styled.div({
  padding: "20px",
  height: "20%",
  width: "20%",
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
  height: "20px",
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

const CenterLoader = styled.div({
  position: "absolute",
  top: "50%",
  left: "47%",
  margin: "-25px 0 0 -25px",
});
export default Main;
