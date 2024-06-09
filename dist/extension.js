/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(__webpack_require__(1));
const StatusBar_1 = __webpack_require__(2);
const achievements_1 = __webpack_require__(3);
const AchievementPanel_1 = __webpack_require__(4);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log("Gamify Plugin is activated");
    let achievements = (0, achievements_1.getAchievements)(context.globalState.get("Achievements"));
    // Initiate StatusBar
    const statusBar = new StatusBar_1.StatusBar("Achievements", "achievements.achievements");
    vscode.workspace.onDidChangeTextDocument((event) => {
        event.contentChanges.forEach((change) => {
            (0, achievements_1.checkForCompletion)(achievements, context, statusBar, event.document.languageId, change, event.document);
        });
    });
    // The command has been defined in the package.json file
    let resetAchievementsCommand = vscode.commands.registerCommand("gamify.resetAchievements", () => {
        achievements = (0, achievements_1.resetAchievements)(context);
    });
    let showAchievementsCommand = vscode.commands.registerCommand("gamify.showAchievements", () => {
        AchievementPanel_1.AchievementPanel.createOrShow(context.extensionUri, achievements, statusBar);
    });
    context.subscriptions.push(resetAchievementsCommand, showAchievementsCommand);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusBar = void 0;
const vscode = __importStar(__webpack_require__(1));
class StatusBar {
    name;
    bar;
    constructor(name, command) {
        this.name = name;
        this.bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        this.bar.text = this.name;
        this.bar.command = command;
        this.bar.show();
    }
    // Update the status of the bar
    update(val1, val2) {
        if (val1 === val2) {
            this.bar.text = `✔ ${this.name}`;
        }
        else {
            this.bar.text = `${this.name} ${val1}/${val2}`;
        }
        this.bar.show;
    }
    // "Notify" the user about the new achievement
    notify() {
        this.bar.text = `❗ ${this.name}`;
    }
}
exports.StatusBar = StatusBar;


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetAchievements = exports.accomplishedAchievements = exports.getAchievements = exports.checkForCompletion = exports.Achievement = void 0;
const vscode = __importStar(__webpack_require__(1));
const AchievementPanel_1 = __webpack_require__(4);
class Achievement {
    name;
    description;
    done;
    fileTypes;
    checkCondition;
    constructor(name, description, done, fileTypes, checkCondition) {
        this.name = name;
        this.description = description;
        this.done = done;
        this.fileTypes = fileTypes;
        this.checkCondition = checkCondition;
    }
    async finished(context, achievements, statusBar) {
        this.done = true;
        statusBar.notify();
        let answer = await vscode.window.showInformationMessage(`✅🏆 ${this.name}`, "Show Achievements");
        if (answer === "Show Achievements") {
            AchievementPanel_1.AchievementPanel.createOrShow(context.extensionUri, achievements, statusBar);
        }
    }
}
exports.Achievement = Achievement;
// Check wether an achievement is done
function checkForCompletion(achievements, context, statusBar, fileType, change, doc) {
    let GlobalChangedLines = parseInt(context.globalState.get("changedLines") ?? "0");
    const line = doc.lineAt(change.range.start.line).text;
    achievements.forEach((achievement) => {
        // If the condition is true and the achievement isn't done
        if (achievement.done)
            return;
        if (!achievement.fileTypes.includes(fileType))
            return;
        if (achievement.name === "First steps" && change) {
            const newLines = change.text.split("\n").length - 1;
            if (achievement.checkCondition(context, newLines, GlobalChangedLines)) {
                achievement.finished(context, achievements, statusBar);
            }
        }
        else if (achievement.checkCondition(change, line, fileType)) {
            achievement.finished(context, achievements, statusBar);
        }
    });
    // Update the keys
    context.globalState.update("Achievements", achievements);
}
exports.checkForCompletion = checkForCompletion;
const allJavaScript = [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
];
const allHTML = ["html", "vue"];
let achievements = [
    new Achievement("Welcome!", "Thank you for downloading the Achievements extension!", false, [...allJavaScript, ...allHTML], () => {
        return true;
    }),
    new Achievement("Hello World Explorer", "Write your first “Hello, World!” program in a new language.", false, [...allJavaScript, ...allHTML], (change, line) => {
        return line.match(/.*Hello.* World.*\)/g) !== null;
    }),
    new Achievement("Function Novice", "Write your first Function", false, allJavaScript, (change, line) => {
        return line.includes("function");
    }),
    // TODO:
    // new Achievement(
    //   "Recursive Ruler",
    //   "Write a recursive function",
    //   false,
    //   allJavaScript,
    //   () => {
    //     return true;
    //   }
    // ),
    new Achievement("Class Novice", "Write your first Class", false, allJavaScript, (change, line) => {
        return line.includes("class");
    }),
    new Achievement("Cartograph", "Use the first map data type in your code", false, allJavaScript, (change, line) => {
        return line.includes("new Map(");
    }),
    new Achievement("Filter Fanatic", "Use the first map function in your code", false, allJavaScript, (change, line) => {
        return line.includes(".map(");
    }),
    new Achievement("Filter Fanatic", "Use the first filter function in your code", false, allJavaScript, (change, line) => {
        return line.includes(".filter(");
    }),
    new Achievement("Map reduced", "Use the first reduce function in your code", false, allJavaScript, (change, line) => {
        return line.includes(".reduce(");
    }),
    new Achievement("Regex Sorcerer", "Write complex regex, which is longer than 9 characters", false, allJavaScript, (change, line) => {
        // use complicated regex
        return line.match(/new RegExp\(..{10,}.\)/g) !== null;
    }),
    new Achievement("Spread the Joy", "Unpack a variable with ...", false, allJavaScript, (change, line) => {
        return line.includes("...");
    }),
    new Achievement("String Splitter", "Split a string into an array of substrings", false, allJavaScript, (change, line) => {
        return line.includes(".split(");
    }),
    new Achievement("Parallel Universe", "Create a asynchronous function", false, allJavaScript, (change, line) => {
        return line.includes("async");
    }),
    new Achievement("Promise Keeper", "Use a promise", false, allJavaScript, (change, line) => {
        return line.includes("new Promise(");
    }),
    new Achievement("What's your comment?", "Commenting on your code", false, [...allJavaScript, ...allHTML], (change, line, fileType) => {
        if (allJavaScript.includes(fileType))
            return line.includes("//");
        else
            return line.includes("<!--");
    }),
    // TODO:
    new Achievement("Documentation Dynamo", "Write a JSDoc comment", false, allJavaScript, (change, line) => {
        return line.includes("@param") || line.includes("@returns");
    }),
    // TODO:
    // new Achievement(
    //   "Code Minimization Guru",
    //   "Minimize code length while maintaining readability.",
    //   false,
    //   allJavaScript,
    //   () => {
    //     return false;
    //   }
    // ),
    new Achievement("Shorthand Master", "Writing a shorthand if", false, allJavaScript, (change, line) => {
        return line.match(/.*\?.*:/g) !== null;
    }),
    new Achievement("Switcheroo!", "Using a switch instead of else if", false, allJavaScript, (change, line) => {
        return line.includes("switch");
    }),
    new Achievement("Bit by Bit", "Bit manipulation operator used", false, allJavaScript, (change, line) => {
        const expressions = [" & ", " | ", "^", "~", "<<", ">>"];
        return expressions.some((exp) => {
            if (line.includes(exp)) {
                return true;
            }
        });
    }),
    new Achievement("Magic Numbers", "Using a random number", false, allJavaScript, (change, line) => {
        return line.includes("Math.random(");
    }),
    new Achievement("LambDuh!", "Use a lambda function", false, allJavaScript, (change, line) => {
        return line.match(/=.*(.*).*=>/g);
    }),
    new Achievement("Line by Line", "10000 lines written", false, allJavaScript, (context, newLines, GlobalChangedLines) => {
        if (newLines > 0) {
            GlobalChangedLines += newLines;
            // save newLines to extension state
            context.globalState.update("changedLines", GlobalChangedLines);
            return GlobalChangedLines > 10000;
        }
        return false;
    }),
    // TODO: Harder achievements
    // new Achievement(
    //   "Error Eliminator",
    //   "Debug and resolve a runtime error.",
    //   false,
    // allJavaScript,
    //   () => {
    //     return false;
    //   }
    // ),
    // new Achievement(
    //   "Optimization Expert",
    //   "Optimize your code for speed and efficiency.",
    //   false,
    //   allJavaScript,
    //   () => {
    //     return false;
    //   }
    // ),
    // new Achievement(
    //   "Syntax Sleuth",
    //   "Successfully debug a cryptic syntax error.",
    //   false,
    //   allJavaScript,
    //   () => {
    //     return false;
    //   }
    // ),
    // new Achievement(
    //   "Version Control Virtuoso",
    //   "Master Git commands and resolve merge conflicts.",
    //   false,
    //   allJavaScript,
    //   () => {
    //     return false;
    //   }
    // ),
    // new Achievement(
    //   "Refactoring Wizard",
    //   "Transform spaghetti code into elegant, modular functions.",
    //   false,
    //   allJavaScript,
    //   () => {
    //     return false;
    //   }
    // ),
    // HTML Achievements
    new Achievement("Tag Customizer", "Create a custom HTML tag", false, allHTML, (change, line) => {
        return line.match(/<.*[^-]-[^-].*>/g) !== null;
    }),
    new Achievement("Pixel Picasso", "Show an image or svg", false, allHTML, (change, line) => {
        return line.includes("<img") || line.includes("<svg");
    }),
    new Achievement("The missing link", "Create a hyperlink", false, allHTML, (change, line) => {
        return line.includes("<a");
    }),
    new Achievement("List Lover", "Create a list", false, allHTML, (change, line) => {
        return line.includes("<ul") || line.includes("<ol");
    }),
    new Achievement("Table Turner", "Create a table", false, allHTML, (change, line) => {
        return line.includes("<table");
    }),
    new Achievement("", "", false, allHTML, (change, line) => {
        return;
    }),
    new Achievement("Frame it!", "Include an iframe", false, allHTML, (change, line) => {
        return line.includes("<iframe");
    }),
];
function getAchievements(obj) {
    // If there is no initial object declared
    if (!obj) {
        return achievements;
    }
    // Set the achievements to the state they were in the save
    return achievements.map((achievement) => {
        let item = obj.find((k) => k.name === achievement.name);
        if (item !== undefined) {
            achievement.done = item.done;
        }
        return achievement;
    });
}
exports.getAchievements = getAchievements;
function accomplishedAchievements(achievements) {
    return achievements.filter((achievement) => achievement.done);
}
exports.accomplishedAchievements = accomplishedAchievements;
function resetAchievements(context) {
    context.globalState.update("Achievements", "");
    vscode.window.showInformationMessage("Reset Achievements");
    return achievements.map((achievement) => {
        achievement.done = false;
        return achievement;
    });
}
exports.resetAchievements = resetAchievements;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AchievementPanel = void 0;
const vscode = __importStar(__webpack_require__(1));
const achievements_1 = __webpack_require__(3);
class AchievementPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    static currentPanel;
    static viewType = "achievements";
    _panel;
    _extensionUri;
    _disposables = [];
    static createOrShow(extensionUri, achievements, statusBar) {
        statusBar.update((0, achievements_1.accomplishedAchievements)(achievements).length, achievements.length);
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (AchievementPanel.currentPanel) {
            AchievementPanel.currentPanel._panel.reveal(column);
            AchievementPanel.currentPanel._update(achievements);
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(AchievementPanel.viewType, "Achievements", column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "media"),
                vscode.Uri.joinPath(extensionUri, "out/compiled"),
            ],
        });
        AchievementPanel.currentPanel = new AchievementPanel(panel, extensionUri, achievements);
    }
    static kill() {
        AchievementPanel.currentPanel?.dispose();
        AchievementPanel.currentPanel = undefined;
    }
    static revive(panel, extensionUri, achievements) {
        AchievementPanel.currentPanel = new AchievementPanel(panel, extensionUri, achievements);
    }
    constructor(panel, extensionUri, achievements) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        // Set the webview's initial html content
        this._update(achievements);
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }
    dispose() {
        AchievementPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    async _update(achievements) {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview, achievements);
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }
    _getHtmlForWebview(webview, achievements) {
        let achievementsInText = "";
        for (const element of achievements) {
            let a = element;
            achievementsInText += `<p class="achievement">${a.done ? "✔️" : "❌"}&emsp;<b>${a.name}</b>${a.done ? "&emsp;-&emsp;" + a.description : ""}</p>`;
        }
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1 align="center" id="heading">Achievements</h1>
  <hr>
  <br><br>
  <div class="achievements">${achievementsInText}</div>
  <p class="accomplishedAchievements">

    <a class="count✔️">${(0, achievements_1.accomplishedAchievements)(achievements).length}</a>/<a class="countAll">${achievements.length}</a>
  </p>
</body>

</html>`;
    }
}
exports.AchievementPanel = AchievementPanel;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map