import React, {useState} from 'react';
import {CardBody, CardBodyItem, CardHeader, CardMain} from "./style";
import Checkbox from "../Checkbox";

interface CardProps {
    name: string;
}

const Card: React.FC<CardProps> = ({name}) => {

    return (
        <CardMain>
            <CardHeader>
                {name}
            </CardHeader>
            <CardBody>
                <CardBodyItem>Data: 22/02/2023 01:52</CardBodyItem>
                <CardBodyItem justifycontent="end"><Checkbox label="Concluir" /></CardBodyItem>
            </CardBody>
        </CardMain>
    );
};

export default Card;