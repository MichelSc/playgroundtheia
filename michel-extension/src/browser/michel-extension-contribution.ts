import { injectable, inject, optional } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';
import { QuickInputService } from '@theia/core/lib/browser/quick-input';
import { QuickSelectService } from './quick-select-service';

export const MichelExtensionCommand: Command = {
    id: 'MichelExtension.command',
    label: 'Say Hello'
};

@injectable()
export class MichelExtensionCommandContribution implements CommandContribution {

    @inject(QuickInputService) @optional()
    protected readonly quickInputService: QuickInputService;

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(MichelExtensionCommand, {
            execute: () => {
                // first task
                const message = `message from michel: arg1`;
                this.messageService.info(message);
                // second task
                this.quickInputService?.open(QuickSelectService.PREFIX)
            }
        });
    }
}

@injectable()
export class MichelExtensionMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: MichelExtensionCommand.id,
            label: MichelExtensionCommand.label
        });
    }
}
