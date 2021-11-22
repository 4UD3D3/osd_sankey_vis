import { IModule } from 'angular';

// @ts-ignore
import { KbnSankeyVisController } from './kbn_sankey_vis_controller';

/** @internal */
export const initVisLegacyModule = (angularIns: IModule): void => {
  angularIns
    .controller('KbnSankeyVisController', KbnSankeyVisController);
};
