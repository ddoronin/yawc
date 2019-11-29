import React, { useState } from 'react';
import styled from 'styled-components';
import {WssModel} from './model';
import { useRxStateResult } from '@reonomy/reactive-hooks';
import { Button, Input, TextArea } from '../components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const wss = new WssModel<string>();

function WSS() {
    const [uri, setUri] = useState('');
    const [message, setMessage] = useState('');
    const log = useRxStateResult(wss.log$)

    const connect = () => wss.connect(uri)
    const disconnect = () => wss.disconnect;
    const send = () => wss.send(message);

    return (
        <Wrapper>
            <Input type="text" placeholder="ws://..." defaultValue={uri} onChange={e => setUri(e.target.value)} />
            <Button type="button" onClick={connect}>Connect</Button>
            <Button type="button" onClick={disconnect}>Disconnect</Button>
            <TextArea onChange={e => setMessage(e.target.value)}/>
            <Button type="button" onClick={send}>Send</Button>
            <div>
                {log && log.map(({type, message, ts}) => {
                    return (
                        <div key={ts}>
                            <small>{type} - {new Date(ts).toLocaleTimeString()}</small>
                            <div>{message}</div>
                            <hr/>
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
}

export default WSS;