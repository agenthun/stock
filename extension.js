// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "stock" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('stock.agent', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from stock!');

	});

	context.subscriptions.push(disposable);

	const xStockHost = 'https://api.money.126.net/data/feed/';
	var stockCodes = new Array('603893', '603069');
	axios.default
		.get(`${xStockHost}${stockCodes.join(',')}?callback=a`)
		.then(resp => {
			console.log(`${resp}`);
			createStatusBarItem(resp);
		})
		.catch(e => {
			console.error(e);
		})
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

function createStatusBarItem(item) {
	const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	barItem.text = "1313";
	barItem.show();
	return barItem;
}