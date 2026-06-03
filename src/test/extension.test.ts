import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { SerializationConfigService } from '../sitecore/serializationConfigService';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('infers include from serialized yaml path', () => {
		const service = SerializationConfigService.getInstance();
		const includeName = service.inferIncludeFromYamlPath('D:/Git/Client/dxp-sitecoreai/serialization/_Client.main/items/Content.Site.Client/Client-website/Settings/Site Grouping/Client-website.yml');

		assert.strictEqual(includeName, 'Content.Site.Client');
	});

	test('infers include from nested items directories', () => {
		const service = SerializationConfigService.getInstance();
		const includeName = service.inferIncludeFromYamlPath('D:/Git/Client/dxp-sitecoreai/authoring/items/nextjs-starter/items/Feature.Navigation/site/home.yml');

		assert.strictEqual(includeName, 'Feature.Navigation');
	});

	test('returns undefined when yaml path has no items segment', () => {
		const service = SerializationConfigService.getInstance();
		const includeName = service.inferIncludeFromYamlPath('D:/Git/Client/dxp-sitecoreai/authoring/items/nextjs-starter/DefaultRenderingHost/Default.yml');

		assert.strictEqual(includeName, undefined);
	});

	test('resolves include details case-insensitively', () => {
		const service = SerializationConfigService.getInstance();
		const includeInfo = service.getIncludeInfo('_Client.main', 'content.site.Client');

		assert.ok(includeInfo);
		assert.strictEqual(includeInfo?.include, 'Content.Site.Client');
		assert.strictEqual(includeInfo?.path, '/sitecore/content/Client/Client-website');
		assert.strictEqual(includeInfo?.scope, 'ItemAndChildren');
		assert.strictEqual(includeInfo?.pushOperations, 'CreateAndUpdate');
		assert.strictEqual(includeInfo?.database, 'master');
	});

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
