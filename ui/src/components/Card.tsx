import React from 'react';
import {Card as MuiCard, CardProps} from "@mui/material";
import {useTSelector} from "../hooks/useTSelector";
import {getCardBg} from "../themes/primary";

const Card: React.FC<CardProps> = (props) => {
    const {mode} = useTSelector(state => state.mode)

    return (
        <MuiCard {...props} style={{backgroundColor: getCardBg(mode)}}>
            {props.children}
        </MuiCard>
    );
};

export default Card;
