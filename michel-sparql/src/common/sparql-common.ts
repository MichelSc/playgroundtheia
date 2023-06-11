import { injectable, inject } from '@theia/core/shared/inversify';
import { ISparqlExecutorServer} from './sparql-protocol';
// import { SparqlExecutorWatcher} from './sparql-watcher';

// export const SparqlExecutorFactory = Symbol('SparqlExecutorFactory');
// export type SparqlExecutorFactory = (name: string) => ISparqlExecutor;


export const ISparqlExecutor = Symbol('ISparqlExecutor');
export interface ISparqlExecutor {
    executeSelect(repo: any, query: string):Promise<string | undefined>;
}

@injectable()
export class SparqlExecutor implements ISparqlExecutor {

    @inject(ISparqlExecutorServer) protected readonly server: ISparqlExecutorServer;
    // @inject(SparqlExecutorWatcher) protected readonly watcher: SparqlExecutorWatcher;
    // @inject(SparqlExecutorFactory) protected readonly factory: SparqlExecutorFactory;
 
    executeSelect(repo: any, query: string): Promise<string | undefined> {
        return this.server.executeSelect(repo, query);
    }

}