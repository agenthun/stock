// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
let statusBarItems = {};
let timer = null;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('stock.agent', function () {
		fetchData();
	});
	context.subscriptions.push(disposable);

	timer = setInterval(fetchData, 1500);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	timer && clearInterval(timer);
}

exports.deactivate = deactivate;

module.exports = {
	activate,
	deactivate
}

function fetchData() {
	const stockCode = '603893';
	const thsBasedHost = `http://d.10jqka.com.cn/`;
	const thsStockAll = `${thsBasedHost}v6/line/hs_${stockCode}/01/all.js`;
	axios.default
		.get(thsStockAll
			, {
				timeout: 5000,
				headers: {
					'Referer': 'http://m.10jqka.com.cn/stockpage/',
					'Accept': 'application/json, text/plain, */*',
					'Accept-Encoding': 'gzip, deflate'
				}
			}
		)
		.then(resp => {
			try {
				const json = resp.data.replace(/^quotebridge(.*\()/g, '').slice(0, -1);
				processStockResp(stockCode, json);
			} catch (error) {
				console.error(error);
			}
		})
		.catch(e => {
			console.error(e);
		})
}

function processStockResp(stockCode, json) {
	const text = showStockData(json);
	if (statusBarItems[stockCode]) {
		statusBarItems[stockCode].text = text;
	} else {
		statusBarItems[stockCode] = createStatusBarItem(text);
	}
}

function showStockData(data) {
	return data;
}

function createStatusBarItem(text) {
	const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	barItem.text = `${text}`;
	barItem.show();
	return barItem;
}