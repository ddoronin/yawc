import React from 'react';
import styled, { css } from 'styled-components';
import { LogMessage } from '../models/ws-logger';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

interface RowProps {
    isReq?: boolean;
    isHeader?: boolean;
}

const Row = styled.div`
    display: flex;
    border-bottom: 1px solid green;
    ${(props: RowProps) => props.isReq && css`
        color: #eeff00;
        background-color: #274c22;
    `}
    ${(props: RowProps) => props.isHeader && css`
        height: 24px;
        line-height: 24px;
        background-color: black;
    `}
`;

const DataCol = styled.div`
    flex: 1;
`;

const InfoCol = styled.div`
    width: 20px;
`;

const LenCol = styled.div`
    width: 100px;
`;

const TimeCol = styled.div`
    width: 100px;
`;

export interface LogProps {
    source: LogMessage[];
}

interface MessageProps<Message> {
    type: string,
    message: Message,
    length: number,
    ts: number
}

const In = styled.span`
    color: red;
`

const Ev = styled.span`
    color: grey;
`

const Err = styled.span`
    color: red;
`

function pad(num: number, size: number) {
    var s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}


function Info({type}: {type: string}) {
    if (type === 'req') return <>⬆</>;
    if (type === 'res') return <In>⬇</In>;
    if (type === 'event') return <Ev>[𝖎]</Ev>;
    if (type === 'error') return <Err>𝓔</Err>;
    return null;
}

function Channel<Message>({type, message, length, ts}: MessageProps<Message>) {
    const isReq = type === 'req';
    const date = new Date(ts);
    const ms = date.getMilliseconds()
    return (
        <Row isReq={isReq}>
            <InfoCol><Info type={type}/></InfoCol>
            <DataCol><pre>{message}</pre></DataCol>
            <LenCol>{type === 'req' || type === 'res'? length: '--'}</LenCol>
            <TimeCol><small>{date.toLocaleTimeString()}</small>.<strong>{pad(ms, 3)}</strong></TimeCol>
        </Row>
    )
}

function Empty() {
    return (
        <Row>
            <DataCol>--</DataCol>
            <LenCol>--</LenCol>
            <TimeCol>--</TimeCol>
        </Row>
    )
}

function Header() {
    return (
        <Row isHeader>
            <DataCol>Data</DataCol>
            <LenCol>Length</LenCol>
            <TimeCol>Time</TimeCol>
        </Row>
    )
}

export function Log<Message>({source}: LogProps) {
    return (
        <Wrapper>
            <Header/>
            {source.length === 0 && <Empty/>}
            {source.length > 0 && source.map(({type, message, ts}) => {
                return <Channel key={ts} type={type} message={message} length={(message as any).length} ts={ts}/>;
            })}
        </Wrapper>
    );
}
