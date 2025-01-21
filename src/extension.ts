import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  const icons = [
    "$(sharingan-0-deg)",
    "$(sharingan-45-deg)",
    "$(sharingan-90-deg)",
    "$(sharingan-135-deg)",
    "$(sharingan-180-deg)",
    "$(sharingan-225-deg)",
    "$(sharingan-270-deg)",
    "$(sharingan-315-deg)",
  ];
  let index = 0;
  let isVisible = true;
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  statusBarItem.text = `${icons[index]}`;
  statusBarItem.show();

  const onTextChanged = vscode.workspace.onDidChangeTextDocument((event) => {
    if (
      vscode.window.activeTextEditor &&
      event.document === vscode.window.activeTextEditor.document
    ) {
      if (!icons[index]) {
        index = 0;
      }
      statusBarItem.text = `${icons[index]}`;
      index++;
    }
  });

  const toggleStatusBarCommand = vscode.commands.registerCommand(
    "extension.toggleSharingan",
    () => {
      isVisible = !isVisible;
      if (isVisible) {
        statusBarItem.show();
      } else {
        statusBarItem.hide();
      }
    }
  );
  context.subscriptions.push(onTextChanged, toggleStatusBarCommand);
}

export function deactivate(): void {}
