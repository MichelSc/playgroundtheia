import { inject, injectable, postConstruct } from '@theia/core/shared/inversify';
import { SparqlExecutorWatcher } from '../common/sparql-watcher';
import { ISparqlExecutorServer, ISparqlExecutorClient } from '../common/sparql-protocol';

@injectable()
export class GraphDBSparqlExecutorServer implements ISparqlExecutorServer {

    protected client: ISparqlExecutorClient | undefined = undefined;

    // the watcher is optional, can be used on the backend for getting notifications on the backend
    @inject(SparqlExecutorWatcher) protected watcher: SparqlExecutorWatcher;

    @postConstruct()
    protected init(): void {
    }

    async setSomtehtingChanged(event: string): Promise<void> {
        // for firing notifications to the frontend, if some client
        if (this.client !== undefined) {
            this.client.onSomethingChanged(event);
        }
        // for firing notifications to the backend (this end)
        this.watcher.fireSomethingChanged(event);
    }

    executeSelect(repo: any, query: string):Promise<string | undefined> {
        this.setSomtehtingChanged("query started");
        return Promise.resolve("query result");
    }

    dispose(): void { }

    setClient(client: ISparqlExecutorClient | undefined): void {
        this.client = client;
    }
}
