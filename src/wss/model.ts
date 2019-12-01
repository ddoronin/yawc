import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { scan, merge, map } from 'rxjs/operators';
import { computed } from '../decorators/computed';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export interface ILog<Message> {
    type: string, 
    ts: number,
    message: Message
}

export class WssModel<Message> {
    private currentWSS$: WebSocketSubject<Message> | null = null;
    private req$ = new Subject<Message>();
    private res$ = new Subject<Message>();
    private subscriptions: Subscription[] = [];
    private connected$ = new BehaviorSubject(false);

    /**
     * Sends a message to a websocket.
     * @param message 
     */
    public send(message: Message) {
        if (!this.currentWSS$ || this.currentWSS$.closed) {
            throw new Error("Websocket is not connected.")
        }
        this.req$.next(message);
    }

    /**
     * Disconnects from the active websocket.
     */
    public disconnect() {
        if (this.currentWSS$) {
            this.currentWSS$.unsubscribe();
            this.currentWSS$.complete();
            this.subscriptions.forEach(subscription => subscription.unsubscribe());
            this.subscriptions = [];
            this.connected$.next(false);
        }
    }

    /**
     * Connects to a given websocket.
     * @param uri 
     */
    public connect(uri: string) {
        if (uri && uri.length > 0) {
            this.disconnect();
            this.currentWSS$ = webSocket<Message>({
                url: uri, 
                serializer: t => t as any, 
                deserializer: (e: MessageEvent) => e.data,
                openObserver: {
                    next: () => {
                        console.log(`connected to ${uri}`);
                        this.connected$.next(true);
                    }
                }
            });

            this.subscriptions.push(this.req$.subscribe(this.currentWSS$));
            this.subscriptions.push(this.currentWSS$.subscribe({
                next: data => this.res$.next(data),
                error: (error) => {
                    console.log('error', error);
                    this.disconnect();
                },
                complete: () => {
                    console.log('complete');
                    this.disconnect();
                }
            }));
        }
    }

    private clearCommand$ = new Subject<'clear'>()
    public clearLog() {
        this.clearCommand$.next('clear');
    }

    @computed public get isConnected$() {
        return this.connected$.asObservable();
    }

    @computed public get log$() {
        const req$$ = this.req$.pipe(map(req => ({type: 'req', ts: Date.now(), message: req})));
        const res$$ = this.res$.pipe(map(res => ({type: 'res', ts: Date.now(), message: res})));

        return req$$.pipe(
            merge(res$$),
            merge(this.clearCommand$),
            scan((acc: ILog<Message>[], val: ILog<Message> | 'clear') => {
                if (val === 'clear') return [];
                return [...acc, val]
            }, [])
        )
    }
}
