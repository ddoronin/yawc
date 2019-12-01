import React from 'react';
import styled, { css } from 'styled-components';
import { ILog } from './model';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const NoRecords = styled.div`
    display: 1;
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

const InOutCol = styled.div`
    width: 20px;
`;

const LenCol = styled.div`
    width: 100px;
`;

const TimeCol = styled.div`
    width: 150px;
`;

export interface LogProps<Message> {
    source: ILog<Message>[];
    render: (m: Message) => React.ReactNode
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

function pad(num: number, size: number) {
    var s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

function Channel<Message>({type, message, length, ts}: MessageProps<Message>) {
    const isReq = type === 'req';
    const date = new Date(ts);
    const ms = date.getMilliseconds()
    return (
        <Row isReq={isReq}>
            <InOutCol>{isReq? '⬆': <In>⬇</In>}</InOutCol>
            <DataCol><pre>{message}</pre></DataCol>
            <LenCol>{length}</LenCol>
            <TimeCol><small>{date.toLocaleTimeString()}</small>.<strong>{pad(ms, 3)}</strong></TimeCol>
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

export function Log<Message>({source, render}: LogProps<Message>) {
    return (
        <Wrapper>
            <Header/>
            {source.length === 0 && <NoRecords>No Records</NoRecords>}
            {source.length > 0 && source.map(({type, message, ts}) => {
                return <Channel key={ts} type={type} message={message} length={(message as any).length} ts={ts}/>;
            })}
        </Wrapper>
    );
}
