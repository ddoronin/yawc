import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import WsLogger from '../models/ws-logger';
import { useRxStateResult } from '@reonomy/reactive-hooks';
import { theme, Button, Input, TextArea } from '../components';
import { Log } from './Log';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Group = styled.div`
    display: flex;
    margin: ${theme.spacing(1)}px;
    position: relative;
`;

interface UriInputProps {
    connected: boolean
}

const connectButtonWidth = theme.spacing(30);

const UriInput = styled(Input)`
    flex: 1;
    padding-right: ${connectButtonWidth}px;
    ${({connected}: UriInputProps) => connected && css`
        color: #eeff00;
        background-color: #274c22;
    `}
`;

const ConnectButton = styled(Button)`
    border-radius: 0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0;
    position: absolute;
    right: 0;
    width: ${connectButtonWidth}px;
`;

const RequestTextArea = styled(TextArea)`
    flex: 1;
`;

const SendButton = styled(Button)`
    border-radius: 0 0 ${theme.spacing(1)}px 0;
    bottom: 0;
    position: absolute;
    right: 0;
    width: ${connectButtonWidth}px;
`;

export interface WssProps<Message> {
    model: WsLogger<Message>
}

function WSS({model: wss}:  WssProps<string>) {
    const [uri, setUri] = useState('wss://echo.websocket.org');
    const [message, setMessage] = useState('');
    const log = useRxStateResult(wss.log$) || [];
    const connected = useRxStateResult(wss.isConnected$) || false;

    const connect = () => wss.connect({ uri })
    const send = () => wss.send(message);
    const clear = () => wss.clearLog();

    return (
        <Wrapper>
            <Group>
                <UriInput 
                    tabIndex={1} 
                    type="text" 
                    placeholder="ws://..." 
                    defaultValue={uri} 
                    connected={connected} 
                    onChange={e => setUri(e.target.value)}
                    onKeyDown={e => e.keyCode === 13 && connect()} />
                <ConnectButton 
                    tabIndex={2} 
                    type="button" 
                    onClick={connect}>
                    Connect
                </ConnectButton>
            </Group>
            <Group>
                <RequestTextArea 
                    tabIndex={3} 
                    placeholder="Request payload" 
                    onChange={e => setMessage(e.target.value)}/>
                <SendButton 
                    tabIndex={4} 
                    disabled={!connected} 
                    type="button" 
                    onClick={send}>
                    Send
                </SendButton>
            </Group>
            <Group>
                <Button 
                    tabIndex={5} 
                    type="button" 
                    onClick={clear}>
                    Clear
                </Button>
            </Group>
            <Group>
                <Log source={log} />
            </Group>
        </Wrapper>
    );
}

export default WSS;