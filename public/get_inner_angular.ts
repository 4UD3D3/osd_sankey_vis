// inner angular imports
// these are necessary to bootstrap the local angular.
// They can stay even after NP cutover
import angular from 'angular';
// required for `ngSanitize` angular module
import 'angular-sanitize';
import 'angular-recursion';
import { i18nDirective, i18nFilter, I18nProvider } from '@osd/i18n/angular';
import { CoreStart, IUiSettingsClient, PluginInitializerContext } from 'opensearch-dashboards/public';
import {
  initAngularBootstrap,
  PaginateDirectiveProvider,
  PaginateControlsDirectiveProvider,
  PrivateProvider,
  watchMultiDecorator,
  OsdAccessibleClickProvider,
} from '../../../src/plugins/opensearch_dashboards_legacy/public';

initAngularBootstrap();

const thirdPartyAngularDependencies = ['ngSanitize', 'ui.bootstrap', 'RecursionHelper'];

export function getAngularModule(name: string, core: CoreStart, context: PluginInitializerContext) {
  const uiModule = getInnerAngular(name, core);
  return uiModule;
}

let initialized = false;

export function getInnerAngular(name = 'opensearch-dashboards/kbn_sankey_vis', core: CoreStart) {
  if (!initialized) {
    createLocalPrivateModule();
    createLocalConfigModule(core.uiSettings);
    initialized = true;
  }
  return angular
    .module(name, [
      ...thirdPartyAngularDependencies,
      'tableVisConfig',
      'tableVisPrivate',
    ])
    .config(watchMultiDecorator)
    .directive('osdAccessibleClick', OsdAccessibleClickProvider);
}

function createLocalPrivateModule() {
  angular.module('tableVisPrivate', []).provider('Private', PrivateProvider);
}

function createLocalConfigModule(uiSettings: IUiSettingsClient) {
  angular.module('tableVisConfig', []).provider('config', function () {
    return {
      $get: () => ({
        get: (value: string) => {
          return uiSettings ? uiSettings.get(value) : undefined;
        },
        // set method is used in agg_table mocha test
        set: (key: string, value: string) => {
          return uiSettings ? uiSettings.set(key, value) : undefined;
        },
      }),
    };
  });
}
