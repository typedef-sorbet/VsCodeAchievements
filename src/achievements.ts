import * as vscode from "vscode";
import { AchievementPanel } from "./AchievementPanel";

import {rustAchievements} from "./languages/rust";
import { javascriptAchievements } from "./languages/javascript";
import { allAchievements } from "./languages/all";

export class Achievement {
  id!: string;
  name!: string;
  description!: string;
  done!: boolean;
  fileTypes!: Array<string>;
  fileTypeCategory!: string;
  checkCondition!: any;

  constructor(
    id: string,
    name: string,
    description: string,
    done: boolean,
    fileTypes: Array<string>,
    checkCondition: any,
    fileTypeCategory?: string
  ) {
    // used to check the achievement if title etc. changes
    // now can change everything including position
    this.id = id;
    this.name = name;
    this.description = description;
    this.done = done;
    this.fileTypes = fileTypes;
    this.checkCondition = checkCondition;
    this.fileTypeCategory = fileTypeCategory ?? fileTypes.join(", ");
  }

  async finished(
    context: vscode.ExtensionContext,
    achievements: Array<Achievement>
  ): Promise<void> {
    this.done = true;
    let answer = await vscode.window.showInformationMessage(
      `✅🏆 ${this.name}`,
      "Show Achievements"
    );
    if (answer === "Show Achievements") {
      AchievementPanel.createOrShow(context.extensionUri, achievements);
    }
  }
}

// Check wether an achievement is done
export function checkForCompletion(
  achievements: Array<Achievement>,
  context: vscode.ExtensionContext,
  fileType: string,
  change: vscode.TextDocumentContentChangeEvent,
  doc: vscode.TextDocument
) {
  let GlobalChangedLines = parseInt(
    context.globalState.get("changedLines") ?? "0"
  );
  const line = doc.lineAt(change.range.start.line).text;
  achievements.forEach((achievement) => {
    // If the condition is true and the achievement isn't done
    if (achievement.done || !achievement.fileTypes.includes(fileType)) return;
    if (achievement.name === "Line by Line" && change) {
      const newLines = change.text.split("\n").length - 1;
      if (achievement.checkCondition(context, newLines, GlobalChangedLines)) {
        achievement.finished(context, achievements);
      }
    } else if (achievement.checkCondition(line, fileType, change)) {
      achievement.finished(context, achievements);
    }
  });
  // Update the keys
  context.globalState.update("Achievements", achievements);
}

export function getAchievements(
  obj?: Array<Achievement> | undefined
): Array<Achievement> {
  // If there is no initial object declared
  if (!obj) {
    return achievements;
  }

  // Set the achievements to the state they were in the save
  return achievements.map((achievement) => {
    let item = obj.find((k) => k.id === achievement.id);
    if (item !== undefined) {
      achievement.done = item.done;
    }
    return achievement;
  });
}
export function accomplishedAchievements(achievements: Array<Achievement>) {
  return achievements.filter((achievement) => achievement.done);
}
export function resetAchievements(context: vscode.ExtensionContext) {
  context.globalState.update("Achievements", "");
  vscode.window.showInformationMessage("Reset Achievements");
  return achievements.map((achievement) => {
    achievement.done = false;
    return achievement;
  });
}

let achievements: Array<Achievement> = allAchievements();
