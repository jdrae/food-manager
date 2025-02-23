import React, { memo, useState, useEffect } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Collapse,
    IconButton,
    makeStyles
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Edit } from "@material-ui/icons";
import LikedListItem from "./LikedListItem";
import DietRecordListItem from "./DietRecordListItem";
import {
    useDietRecordContext,
    useLikedRecipeContext,
    useUserInfoContext,
    useUserInfoDispatchContext
} from "../Model";
import { UserInfoModal } from "../index";

const useStyles = makeStyles({
    root: {
        width: "100%",
        backgroundColor: "#414141"
    },
    border: {
        backgroundColor: "#606060"
    },
    title: {
        textAlign: "left",
        color: "#00d6af"
    },
    content: {
        textAlign: "right"
    },
    editIcon: {
        fontSize: "15px",
        color: "white"
    },
    deleteIcon: {
        fontSize: "20px",
        color: "white"
    }
});

const InfoList = () => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [likedOpen, setLikedOpen] = useState(false);
    const [logOpen, setLogOpen] = useState(false);
    const userInfo = useUserInfoContext();

    const bmiCal = (height: number, weight: number) => {
        return (weight / ((height / 100) * (height / 100))).toFixed(2);
    };
    const bmiMessage = (height: number, weight: number) => {
        const bmi = weight / ((height / 100) * (height / 100));
        if (bmi < 18.5) return "Underweight";
        else if (bmi > 25) return "Overweight";
        else return "Normal weight";
    };
    const likedHandleClick = () => {
        setLikedOpen(!likedOpen);
    };
    const logHandleClick = () => {
        setLogOpen(!logOpen);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="total user info">
                <ListItem>
                    <ListItemText className={classes.title} primary="My body info" />
                    {userInfo.map((value) =>
                        value.height ? (
                            <ListItemText
                                className={classes.content}
                                primary={`${value.height}cm / ${value.weight}kg`}
                            />
                        ) : (
                            <ListItemText
                                className={classes.content}
                                primary={"No body info exists."}
                            />
                        )
                    )}
                    <IconButton onClick={() => setModalOpen(true)}>
                        <Edit className={classes.editIcon} />
                    </IconButton>
                    {userInfo.map((value) => (
                        <UserInfoModal
                            open={modalOpen}
                            handleClose={handleModalClose}
                            userHeight={value.height}
                            userWeight={value.weight}
                        />
                    ))}
                </ListItem>
                <Divider className={classes.border} />
                <ListItem>
                    <ListItemText className={classes.title} primary="BMI" />
                    {userInfo.map((value) =>
                        value.height ? (
                            <ListItemText
                                className={classes.content}
                                primary={`${bmiCal(value.height, value.weight)} / ${bmiMessage(
                                    value.height,
                                    value.weight
                                )}`}
                            />
                        ) : (
                            <ListItemText
                                className={classes.content}
                                primary={"No body info exists."}
                            />
                        )
                    )}
                </ListItem>
                <Divider className={classes.border} />
                <ListItem button onClick={logHandleClick}>
                    <ListItemText className={classes.title} primary="Diet records" />
                    {logOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={logOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {useDietRecordContext().map((value) => (
                            <DietRecordListItem
                                id={value.id}
                                recipe_id={value.recipe_id}
                                put_date={value.put_date}
                                recipe_name={value.recipe_name}
                            />
                        ))}
                    </List>
                </Collapse>
                <Divider className={classes.border} />
                <ListItem button onClick={likedHandleClick}>
                    <ListItemText className={classes.title} primary="Liked recipe" />
                    {likedOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={likedOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {useLikedRecipeContext().map(
                            (value) =>
                                value.score > 0 && (
                                    <LikedListItem
                                        recipe_id={value.recipe_id}
                                        id={value.id}
                                        user_id={value.user_id}
                                        score={value.score}
                                        name={value.name}
                                    />
                                )
                        )}
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default memo(InfoList);
