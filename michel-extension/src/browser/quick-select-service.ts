import { inject, injectable } from 'inversify';
import { CancellationToken } from '@theia/core/lib/common';
//import { ContextKeyService } from '@theia/core/lib/browser/context-key-service';
import { QuickAccessContribution, QuickAccessProvider, QuickAccessRegistry } from '@theia/core/lib/browser/quick-input/quick-access';
import { QuickPickItem, QuickPicks } from '@theia/core/lib/browser/quick-input/quick-input-service';
import { ILogger } from '@theia/core/lib/common';
import { MessageService } from '@theia/core'

//import { filterItems, QuickPickItem, QuickPicks } from '@theia/core/lib/browser/quick-input/quick-input-service';
//import { CancellationToken, Disposable } from '@theia/core/lib/common';
// export interface QuickSelectItem {
//     readonly label: string;
//     readonly doIt: () => void;
// }

const REPOSITORIES = [ "first repo", "second repo"];

@injectable()
export class QuickSelectService implements QuickAccessContribution, QuickAccessProvider {
    static PREFIX = 'select-pref ';

    protected readonly items: QuickPickItem[] = [];

    @inject(QuickAccessRegistry)
    protected readonly quickAccessRegistry: QuickAccessRegistry;

    @inject(ILogger)
    protected readonly logger: ILogger;

    @inject(MessageService) 
    private readonly messageService: MessageService;
 
    registerQuickAccessProvider(): void {
        this.quickAccessRegistry.registerQuickAccessProvider({
            getInstance: () => this,
            prefix: QuickSelectService.PREFIX,
            placeholder: '',
            helpEntries: [{ description: 'Select KGVIZ repository', needsEditor: false }]
        });
    }

    getPicks(filter: string, token: CancellationToken): QuickPicks {
        return REPOSITORIES.map(repo_string => { 
            return {
                label: repo_string,
                execute: () => {
                    const message = `Quick select invoked with repo ${repo_string}`;
                    this.messageService.info(message);
                    this.logger.info(message)
                }
            }
        });
    }
}
