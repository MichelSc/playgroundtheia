/**
 * Generated using theia-extension-generator
 */
import { MichelExtensionCommandContribution, MichelExtensionMenuContribution } from './michel-extension-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { QuickAccessContribution } from '@theia/core/lib/browser/quick-input';
import { QuickSelectService } from './quick-select-service';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(MichelExtensionCommandContribution);
    bind(MenuContribution).to(MichelExtensionMenuContribution);

    bind(QuickSelectService).toSelf().inSingletonScope();
    bind(QuickAccessContribution).toService(QuickSelectService);

});
