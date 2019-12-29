import { Subject, Observable } from 'rxjs';
import { scan, merge, map, skip } from 'rxjs/operators';
import { computed } from '../decorators/computed';
import Ws, { WsError } from './ws'

export interface LogMessage {
    type: 'req' | 'res' | 'error' | 'event',
    ts: number,
    message: string,
}

function isWsError<Message>(res: Message | WsError): res is WsError {
    return typeof (res as WsError).error !== 'undefined';
}

export default class WsLogger<Message> extends Ws<Message> {
    private events$ = new Subject<LogMessage>();

    private clearCommand$ = new Subject<'clear'>()
    /**
     * Cleans up current log.
     */
    public clearLog() {
        this.clearCommand$.next('clear');
    }

    @computed public get isConnected$(): Observable<boolean> {
        return this.connected$.pipe(map(({connected}) => connected));
    }

    @computed public get uri$(): Observable<string | void> {
        return this.connected$.pipe(map(({uri}) => uri));
    }

    @computed public get log$() {
        const req$$ = this.req$.pipe(map(req => ({ type: 'req' as 'req', ts: Date.now(), message: `${req}` })));
        const res$$ = this.res$.pipe(map(res => {
            if (isWsError(res)) {
                return { type: 'error' as 'error', ts: Date.now(), message: `code: ${res.error.code} reason: '${res.error.reason}'` };
            }
            return { type: 'res' as 'res', ts: Date.now(), message: `${res}` };
        }));
        const events$$ = this.connected$.pipe(
            skip(1),
            map(({connected, uri}) => ({
            type: 'event' as 'event',
            ts: Date.now(),
            message: connected? `${uri} [connected]`: `${uri? (uri + ' '): ''}[disconnected]`
        })));

        return req$$.pipe(
            merge(res$$),
            merge(events$$),
            merge(this.clearCommand$),
            scan((acc: LogMessage[], val: LogMessage | 'clear') => {
                if (val === 'clear') return [];
                return [...acc, val]
            }, [])
        )
    }
}
