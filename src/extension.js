const vscode = require('vscode');
const writeSync = require("clipboardy").writeSync;

const logMessagePrefix = "copy-upath: ";

const config_fullPath_prefix                = "culp.fullPath.prefix";
const config_fullPath_removeDiscColons      = "culp.fullPath.removeDiscColons";

let fullPathPrefix = "";
let removeDiscColons = false;

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
        if ( uri == null ){
            return;
        }

        var path = uri.path;

        if ( removeDiscColons ){
            path = path.replace(/:\//g, '/');
        }

        if ( fullPathPrefix != null ){
            fullPathPrefix = fullPathPrefix.replace(/\/$/g, '');
            path = fullPathPrefix + path;
        }

        writeToClipboard(path);
        log("copied to clipboard: " + path);
    });

    let copyFileNameDisposable = vscode.commands.registerCommand('culp.CopyFileName', function (uri) {
        if ( uri == null ){
            return;
        }
        // Todo [2018/5/24 KL] Find more elegant way to get file name from path
        var fileName = uri.path.substring(uri.path.lastIndexOf('/') + 1);
        writeToClipboard(fileName);
        log("copied to clipboard: " + fileName);
    });

    let copyRelativeDisposable = vscode.commands.registerCommand('culp.CopyRelativePath', function (uri) {
        if ( uri == null ){
            return;
        }

        var path = vscode.workspace.asRelativePath(uri).replace(/\\/g, '/');
        writeToClipboard(path);
        log("copied to clipboard: " + path);
    });

    context.subscriptions.push(copyFullPathDisposable);
    context.subscriptions.push(copyRelativeDisposable);
    context.subscriptions.push(copyFileNameDisposable);
}

function registerSettingsListening(context){
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {

        if (e.affectsConfiguration(config_fullPath_prefix)){
            fullPathPrefix = getSettingsValue(config_fullPath_prefix);
            log("changed config <" + config_fullPath_prefix + ">, new value <" + fullPathPrefix + ">");
        }

        if (e.affectsConfiguration(config_fullPath_removeDiscColons)){
            removeDiscColons = getSettingsValue(config_fullPath_removeDiscColons);
            log("changed config <" + config_fullPath_removeDiscColons + ">, new value <" + removeDiscColons + ">");
        }
    }));
}

function initSettings(context){
    removeDiscColons = getSettingsValue(config_fullPath_removeDiscColons);
    fullPathPrefix   = getSettingsValue(config_fullPath_prefix);
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