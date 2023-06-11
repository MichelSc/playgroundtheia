//import { injectable } from 'inversify';

import { JsonRpcServer } from '@theia/core/lib/common/messaging';

export const SparqlExecutorPath = '/services/SparqlExecutor';

export const ISparqlExecutorServer = Symbol('ISparqlExecutorServer');
export interface ISparqlExecutorServer extends JsonRpcServer<ISparqlExecutorClient> {
    executeSelect(repo: any, query: string):Promise<string | undefined>;
}

export const ISparqlExecutorClient = Symbol('ISparqlExecutorClient');
export interface ISparqlExecutorClient {
    onSomethingChanged(event: string): void;
}