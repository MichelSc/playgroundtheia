import { inject, injectable, postConstruct } from 'inversify';
import { SparqlExecutorWatcher } from '../common/sparql-watcher';
import { ISparqlExecutorServer, ISparqlExecutorClient } from '../common/sparql-protocol';

@injectable()
export class GraphDBSparqlExecutorServer implements ISparqlExecutorServer {

    protected client: ISparqlExecutorClient | undefined = undefined;

    @inject(SparqlExecutorWatcher)
    protected watcher: SparqlExecutorWatcher;

    @postConstruct()
    protected init(): void {
    }

    async setSomtehtingChanged(event: string): Promise<void> {
        if (this.client !== undefined) {
            this.client.onSomethingChanged("something");
        }
        this.watcher.fireSomethingChanged("something");
    }


    executeSelect(repo: any, query: string):Promise<string | undefined> {
        return Promise.resolve("response");

    }

    // async child(name: string): Promise<void> {
    //     this.setLogLevel(name, this.cli.logLevelFor(name));
    // }

    dispose(): void { }

    setClient(client: ISparqlExecutorClient | undefined): void {
        this.client = client;
    }

}
