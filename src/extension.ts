// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import FolderOuter from "./js/folder-outer";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "folder-outer" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "folder-outer.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from folder-outer!");
    }
  );

  context.subscriptions.push(disposable);

  let folderOuter = vscode.commands.registerCommand(
    "folder-outer.create-outer",
    async (context) => {
      console.log(context);
      FolderOuter(context._fsPath);
    }
  );

  context.subscriptions.push(folderOuter);
}

// this method is called when your extension is deactivated
export function deactivate() {}
