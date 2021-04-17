import React, { useState } from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

interface InputProps {
    setValue?: any;
}

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #00d6af 30%, #00c3cf 90%)",
        width: 100,
        height: 100,
        padding: 0
    },
    input: {
        display: "none"
    },
    icon: {
        color: "#414141",
        fontSize: 72
    }
});

const PictureButton = ({ setValue }: InputProps) => {
    const [picture, setPicture] = useState([]);
    const handlePicture = async (e: any) => {
        setPicture(e.target.files[0]);
        if (!picture) {
            alert("파일을 등록해주세요");
            return;
        }
        await axios
            .post("/food-manager/api/picture", {
                picture: picture
            })
            .then((res) => {
                alert("파일이 등록되었습니다.");
                setValue(res.data.text); //수정 필요!!!!!!!
                console.log(res);
            })
            .catch((err) => {
                alert("파일 등록에 실패하였습니다.");
                console.log(err);
            });
    };
    const classes = useStyles();
    return (
        <>
            <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={handlePicture}
            />
            <label htmlFor="icon-button-file">
                <IconButton aria-label="upload picture" component="span" className={classes.root}>
                    <AddIcon className={classes.icon} />
                </IconButton>
            </label>
        </>
    );
};

export default PictureButton;
