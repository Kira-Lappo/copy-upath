const vscode = require('vscode');
const writeSync = require("clipboardy").writeSync;

const wslFullPathPrefix = "/mnt";
const logMessagePrefix = "copy-upath: ";

const config_isWSLPath = "culp.isWSLPath";

let isWSLPath = false;

function activate(context) {

    initSettings(context);
    registerCommands(context);
    registerSettingsListening(context);

    console.log("copy-upath is active");
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

exports.deactivate = deactivate;

function registerCommands(context){
    let copyFullPathDisposable = vscode.commands.registerCommand('culp.CopyFullPath', function (uri) {
        if (uri == null){
            return;
        }

        var path = uri.path.replace(/:\//g, '/'); // Replacing /d:/workspace/vs-code with /d/workspace/vs-code
        if (isWSLPath){
            path = wslFullPathPrefix + path;
        }
        writeToClipboard(path);
        log("copied to clipboard: " + path);
    });

    let copyRelativeDisposable = vscode.commands.registerCommand('culp.CopyRelativePath', function (uri) {
        if (uri == null){
            return;
        }

        var path = vscode.workspace.asRelativePath(uri).replace(/\\/g, '/');
        writeToClipboard(path);
        log("copied to clipboard: " + path);
    });

    context.subscriptions.push(copyFullPathDisposable);
    context.subscriptions.push(copyRelativeDisposable);
}

function registerSettingsListening(context){
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        isWSLPath = e.affectsConfiguration(config_isWSLPath) && getSettingsValue(config_isWSLPath) == true;
        log("changed config <" + config_isWSLPath + ">, new value <" + isWSLPath + ">");
    }));
}

function initSettings(context){
    isWSLPath =  getSettingsValue(config_isWSLPath) == true;
}

function getSettingsValue(settingsPath){
    return vscode.workspace.getConfiguration().get(settingsPath);
}

function writeToClipboard(text){
    writeSync(text);
}

function log(message){
    console.log(logMessagePrefix + message);
}