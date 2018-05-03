const vscode = require('vscode');
const writeSync = require("clipboardy").writeSync;

function activate(context) {

    let copyFullPathDisposable = vscode.commands.registerCommand('culp.CopyFullPath', function (uri) {
        var path = uri.path.replace(/:\//g, '/'); // Replacing /d:/workspace/vs-code with /d/workspace/vs-code
        console.log("Copied: " + path);
        writeSync(path);
    });

    let copyRelativeDisposable = vscode.commands.registerCommand('culp.CopyRelativePath', function (uri) {
        var path = vscode.workspace.asRelativePath(uri).replace(/\\/g, '/');
        console.log("Copied: " + path);
        writeSync(path);
    });

    context.subscriptions.push(copyFullPathDisposable);
    context.subscriptions.push(copyRelativeDisposable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;