import React, { useState } from "react";
import { Divider, Avatar, makeStyles, createStyles, Theme } from "@material-ui/core";
import ItemBox from "@material-ui/core/ListItem";
import { grey } from "@material-ui/core/colors";
import { Modal } from "../index";

interface itemProps {
    id: number;
    user_id: number;
    ingredient_id: number;
    put_date: string;
    expire_date: string;
    custom_ingredient: string;
    name: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            width: theme.spacing(11),
            height: theme.spacing(11),
            marginLeft: "auto",
            borderRadius: "30px"
        }
    })
);

const ListItem = ({
    id,
    user_id,
    ingredient_id,
    put_date,
    expire_date,
    custom_ingredient,
    name
}: itemProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const handleClose = () => {
        setOpen(false);
    };
    // 유통기한 남은일 계산 함수
    let remainDate: number = 0;
    const handleRemainDate = (): Number => {
        const today = new Date(); // 오늘 날짜
        const [exp_y, exp_m, exp_d] = expire_date.slice(0, 10).split("-");
        let put = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        let exp = new Date(Number(exp_y), Number(exp_m), Number(exp_d));
        remainDate = (Number(exp) - Number(put)) / 86400000;
        return remainDate;
    };

    return (
        <>
            <ItemBox button onClick={() => setOpen(true)}>
                <div className="listitem-container">
                    <Avatar
                        variant="square"
                        alt="food"
                        src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fruit-salad-horizontal-jpg-1522181219.jpg"
                        className={classes.large}
                    />
                    <div className="listitem-info">
                        <p className="register-date">{put_date.slice(0, 10)}</p>
                        <p className="listitem-name">{custom_ingredient}</p>
                        <p className="listitem-type">{name}</p>
                        <div className="remain-dates">
                            <b className="expire-date">
                                {expire_date ? expire_date.slice(0, 10) : "enter exp date"}
                            </b>
                            {expire_date ? (
                                <>
                                    {handleRemainDate() > 5 ? (
                                        <b className="remain-date">{remainDate}일 남음</b>
                                    ) : (
                                        <b className="remain-date-warn">{remainDate}일 남음</b>
                                    )}
                                </>
                            ) : (
                                <b className="remain-date-warn">no date</b>
                            )}
                        </div>
                    </div>
                </div>
            </ItemBox>
            <Divider style={{ backgroundColor: grey[600] }} />
            <Modal
                open={open}
                id={id}
                handleClose={handleClose}
                regDate={put_date.slice(0, 10)}
                expDate={expire_date ? expire_date.slice(0, 10) : undefined}
            />
        </>
    );
};

export default ListItem;
