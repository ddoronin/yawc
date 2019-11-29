import React, { useState } from 'react';
import styled from 'styled-components';
import { WssModel } from './model';
import { useRxStateResult } from '@reonomy/reactive-hooks';
import { Button, Input, TextArea } from '../components';
import { Log } from './Log';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ConnectUri = styled.div`
    display: flex;
    > input {
        flex: 1;
    }
`;

export interface WssProps<Message> {
    model: WssModel<Message>
}

function WSS({model: wss}:  WssProps<string>) {
    const [uri, setUri] = useState('ws://localhost:8081/greeter');
    const [message, setMessage] = useState('');
    const log = useRxStateResult(wss.log$) || [];

    const connect = () => wss.connect(uri)
    const send = () => wss.send(message);

    return (
        <Wrapper>
            <ConnectUri>
                <Input type="text" placeholder="ws://..." defaultValue={uri} onChange={e => setUri(e.target.value)} />
                <Button type="button" onClick={connect}>Connect</Button>
            </ConnectUri>
            <TextArea onChange={e => setMessage(e.target.value)}/>
            <Button type="button" onClick={send}>Send</Button>
            <Log source={log} render={(text: string) => text}/>
        </Wrapper>
    );
}

export default WSS;