import { injectable, inject, postConstruct } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, ILogger } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';
import { ISparqlExecutor } from '../common/sparql-common';
import { SparqlExecutorWatcher} from '../common/sparql-watcher';

export const MichelSparqlCommand: Command = {
    id: 'MichelSparql.command',
    label: 'Say Sparql'
};

@injectable()
export class MichelSparqlCommandContribution implements CommandContribution {

    @inject(ILogger) protected logger: ILogger;
    @inject(ISparqlExecutor) protected sparqlExecutor: ISparqlExecutor;
    @inject(SparqlExecutorWatcher) protected watcher: SparqlExecutorWatcher;

    @postConstruct()
    protected init(): void {
        // exemple how to get notifications from the sparql executor service
        this.watcher.onSomethingChanged((e:string) => {
            this.logger.info(`sparql event ${e}`);
        });
    }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(MichelSparqlCommand, {
            execute: () => {
                this.logger.info('command Say sparql called');
                // example how to execute a query from the frontend side
                this.sparqlExecutor.executeSelect("my repo", "my query")
                .then(r=> {
                    this.logger.info(`sparql response ${r}`);
                })
                .catch(e=>{
                    this.logger.error(`sparql erro ${e}`);
                })
            }
        });
    }
}

@injectable()
export class MichelSparqlMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: MichelSparqlCommand.id,
            label: MichelSparqlCommand.label
        });
    }
}
