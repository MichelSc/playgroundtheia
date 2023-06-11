import { ContainerModule } from 'inversify';
import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core/lib/common/messaging';
import { ISparqlExecutorServer, ISparqlExecutorClient, SparqlExecutorPath } from '../common/sparql-protocol';
import { GraphDBSparqlExecutorServer} from './sparql-executor-server';

export const loggerServerModule = new ContainerModule(bind => {
    bind<ISparqlExecutorServer>(ISparqlExecutorServer).to(GraphDBSparqlExecutorServer).inSingletonScope();
    bind(ConnectionHandler).toDynamicValue(ctx =>
        new JsonRpcConnectionHandler<ISparqlExecutorClient>(SparqlExecutorPath, client => {
            const executorServer = ctx.container.get<ISparqlExecutorServer>(ISparqlExecutorServer);
            executorServer.setClient(client);
            return executorServer;
        })
    ).inSingletonScope()
});