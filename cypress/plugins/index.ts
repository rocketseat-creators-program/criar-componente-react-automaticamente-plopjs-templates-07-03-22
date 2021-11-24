/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (on: Cypress.PluginEvents, _config: Cypress.ConfigOptions) => {
	on('before:browser:launch', (browser, launchOptions) => {
		if (browser.name === 'chrome' && browser.isHeadless) {
			launchOptions.args.push('--disable-gpu');
			return launchOptions;
		}
	});
};
