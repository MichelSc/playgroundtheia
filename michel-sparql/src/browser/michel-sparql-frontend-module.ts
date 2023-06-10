/**
 * Generated using theia-Sparql-generator
 */
import { MichelSparqlCommandContribution, MichelSparqlMenuContribution } from './michel-sparql-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';

export default new ContainerModule(bind => {
    // add your contribution bindings here
    bind(CommandContribution).to(MichelSparqlCommandContribution);
    bind(MenuContribution).to(MichelSparqlMenuContribution);

});
