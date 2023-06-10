import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, ILogger } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';

export const MichelSparqlCommand: Command = {
    id: 'MichelSparql.command',
    label: 'Say Sparql'
};

@injectable()
export class MichelSparqlCommandContribution implements CommandContribution {

    @inject(ILogger) protected logger: ILogger;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(MichelSparqlCommand, {
            execute: () => {
                this.logger.info('command Say sparql called');
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
