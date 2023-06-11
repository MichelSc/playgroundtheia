/**
 * Generated using theia-Sparql-generator
 */
import { MichelSparqlCommandContribution, MichelSparqlMenuContribution } from './michel-sparql-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule} from '@theia/core/shared/inversify';

import { WebSocketConnectionProvider } from '@theia/core/lib/browser/messaging/ws-connection-provider';
import { ISparqlExecutor, SparqlExecutor } from '../common/sparql-common';
import { ISparqlExecutorServer, SparqlExecutorPath } from '../common/sparql-protocol';
import { SparqlExecutorWatcher } from '../common/sparql-watcher';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(MichelSparqlCommandContribution);
    bind(MenuContribution).to(MichelSparqlMenuContribution);

    bind(ISparqlExecutor).to(SparqlExecutor).inSingletonScope();

    bind(SparqlExecutorWatcher).toSelf().inSingletonScope();

    // note that ISparqlExecutorServer is bound to the proxy object, and not to the ISparqlExecutorServer implementation
    // this proxt will be used by the SparqlExecutor object when instantiated on the frontend
    bind(ISparqlExecutorServer).toDynamicValue(ctx => {
        const watcher = ctx.container.get(SparqlExecutorWatcher);
        const connection = ctx.container.get(WebSocketConnectionProvider);
        return connection.createProxy<ISparqlExecutorServer>(SparqlExecutorPath, watcher.getSparqlExecutorClient());
    }).inSingletonScope();
});