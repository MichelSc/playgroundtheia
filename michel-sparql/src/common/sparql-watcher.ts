import { Emitter, Event } from '@theia/core/lib/common//event';

import { injectable } from 'inversify';
import { ISparqlExecutorClient } from './sparql-protocol';

@injectable()
export class SparqlExecutorWatcher {

    getSparqlExecutorClient(): ISparqlExecutorClient {
        const emitter = this.onSomethingChangedEmitter;
        return {
            onSomethingChanged(event: string): void {
                emitter.fire(event);
            }
        };
    }

    private onSomethingChangedEmitter = new Emitter<string>();

    get onSomethingChanged(): Event<string> {
        return this.onSomethingChangedEmitter.event;
    }

    // FIXME: get rid of it, backend services should as well set a client on the server
    fireSomethingChanged(event: string): void {
        this.onSomethingChangedEmitter.fire(event);
    }
}
