import React, {useState} from 'react';
import styled, { css } from 'styled-components';
import { LogMessage } from '../models/ws-logger';
import { theme } from '../components';

const Svg = styled.svg`
    fill: ${props => props.fill || theme.default.color};
    vertical-align: text-top;
    padding: 2px 0;
`

export interface SvgParams {
    width: number;
    height: number;
}

const Warning = ({ width, height }: SvgParams) => (
    <Svg 
        fill="#00ffed"
        width={width} 
        height={height} 
        viewBox="0 0 14.317642211914062 14.059268951416016" 
        version="1.1">
        <path 
            fillRule="evenodd" 
            d="M7.4.03a7 7 0 1 0 .002 13.999A7 7 0 0 0 7.4.03zm0 11a.751.751 0 1 1 .003-1.502.751.751 0 0 1-.002 1.502zm.75-3.75a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 1.5 0v3.5z">
        </path>
    </Svg>
)

const ArrowDown = ({ width, height }: SvgParams) => (
    <Svg 
        fill='#0ffd0f'
        width={width} 
        height={height} 
        viewBox="0 0 12 13" 
        version="1.1">
        <path 
            fillRule="evenodd" 
            d="M4 7V0h4v7h4l-6 6-6-6z">
        </path>
    </Svg>
)

const ArrowUp = ({ width, height }: SvgParams) => (
    <Svg 
        fill='red'
        width={width} 
        height={height} 
        viewBox="0 0 12 13" 
        version="1.1">
        <path 
            fillRule="evenodd" 
            d="M4 6v7h4V6h4L6 0 0 6z">
        </path>
    </Svg>
)

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
    line-height: 20px;
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
    width: 120px;
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

const Err = styled.span`
    color: red;
`

function pad(num: number, size: number) {
    var s = String(num);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}


function Info({type}: {type: string}) {
    const size = { width: 16, height: 16};
    switch (type) {
        case 'req': return <ArrowUp {...size}/>;
        case 'res': return <ArrowDown {...size}/>;
        case 'event': return <Warning {...size}/>;
        case 'error': return <Err>Error</Err>;
        default: return null;
    }
}

function toShortString<Message>(message: Message): string {
    const s: string = (message as any).toString();
    const max = 50;
    if (s.length > max) {
        return s.substr(0, max - 3) + '...';
    }
    return s;
}

function Channel<Message>({type, message, length, ts}: MessageProps<Message>) {
    const [expanded, setExpanded] = useState(false);
    const isReq = type === 'req';
    const date = new Date(ts);
    const ms = date.getMilliseconds()
    return (
        <>
        <Row isReq={isReq}>
            <InfoCol><Info type={type}/></InfoCol>
            <DataCol onClick={() => setExpanded(!expanded)}>{toShortString(message)}</DataCol>
            <LenCol>{type === 'req' || type === 'res'? length: '--'}</LenCol>
            <TimeCol><small>{date.toLocaleTimeString()}</small>.<strong>{pad(ms, 3)}</strong></TimeCol>
        </Row>
        {expanded && <Row isReq={isReq}><pre style={{overflow: 'auto', padding: 20}}>{message}</pre></Row>}
        </>
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
