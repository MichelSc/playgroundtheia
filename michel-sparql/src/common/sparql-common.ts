import { injectable, inject } from '@theia/core/shared/inversify';
import { ISparqlExecutorServer} from './sparql-protocol';

export const ISparqlExecutor = Symbol('ISparqlExecutor');
export interface ISparqlExecutor {
    executeSelect(repo: any, query: string):Promise<string | undefined>;
}

@injectable()
export class SparqlExecutor implements ISparqlExecutor {

    // SparqlExecutor works on the frontend and on the backedn
    // on the frontend, server will be a proxy object
    // on the backend, server will be the actual server
    @inject(ISparqlExecutorServer) protected readonly server: ISparqlExecutorServer;
 
    executeSelect(repo: any, query: string): Promise<string | undefined> {
        return this.server.executeSelect(repo, query);
    }

}