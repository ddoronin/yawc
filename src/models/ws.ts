import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketMessage } from 'rxjs/internal/observable/dom/WebSocketSubject';

export interface Connection {
    uri?: string;
    connected: boolean;
}

export interface ConnectionConfig<Message> {
    uri: string;
    serializer?: (value: Message) => WebSocketMessage;
    deserializer?: (event: MessageEvent) => Message;
}

export interface WsError {
    error: {
        code: number;
        reason: string;
    }
}

/**
 * Base model for WebSockets.
 */
export default class Ws<Message> {
    protected req$ = new Subject<Message>();
    protected res$ = new Subject<Message | WsError>();
    protected connected$ = new BehaviorSubject<Connection>({ connected: false });

    private current$: WebSocketSubject<Message> | null = null;
    private subscriptions: Subscription[] = [];

    /**
     * Connects to a given websocket.
     * @param uri 
     */
    public connect({uri, serializer = t => t as any, deserializer = (e: MessageEvent) => e.data}: ConnectionConfig<Message>) {
        if (uri && uri.length > 0) {
            this.disconnect();
            this.current$ = webSocket<Message>({
                url: uri, 
                serializer, 
                deserializer,
                openObserver: {
                    next: () => this.connected$.next({uri, connected: true})
                }
            });

            this.subscriptions.push(this.req$.subscribe(this.current$));
            this.subscriptions.push(this.current$.subscribe({
                next: data => this.res$.next(data),
                error: (error) => {
                    console.error(error);
                    this.res$.next({error: {
                        code: error.code,
                        reason: error.reason
                    }});
                    this.disconnect();
                },
                complete: () => this.disconnect()
            }));
        }
    }

    /**
     * Disconnects from the active websocket.
     */
    public disconnect() {
        if (this.current$) {
            const isStopped = this.current$.isStopped;
            this.current$.unsubscribe();
            this.current$.complete();
            this.subscriptions.forEach(subscription => subscription.unsubscribe());
            this.subscriptions = [];

            if (!isStopped) {
                this.connected$.next({...this.connected$.value, connected: false});
            }
        }
    }

    /**
     * Sends a message to a websocket.
     * @param message 
     */
    public send(message: Message) {
        if (!this.current$ || this.current$.closed) {
            throw new Error("Websocket is not connected.")
        }
        this.req$.next(message);
    }
}
