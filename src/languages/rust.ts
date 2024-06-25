import {Achievement} from "../achievements";
import { AchievementPanel } from "../AchievementPanel";
import * as vscode from "vscode";

import {exec} from "child_process";

let achievements: Array<Achievement> = [
    // TODO TEST
    new Achievement(
        "rust-001",
        "Carnicization",
        "Create your first Rust file.",
        false,
        ["rust"],
        (
            _line: string, 
            _fileType: string, 
            _change: vscode.TextDocumentContentChangeEvent
        ) => {
            // Doesn't matter what the contents are, so long as the file exists.
            return true;
        }
    ),
    
    // TODO TEST
    new Achievement(
        "rust-002",
        "If it Compiles...",
        "Complete a `cargo build` that fully compiles.",
        false,
        ["rust"],
        (
            _line: string,
            _fileType: string,
            _change: vscode.TextDocumentChangeEvent
        ) => {
            let err = undefined;

            // TODO how often does this get called?
            exec("cargo check", (_err, stdout, stderr) => {
                if (_err) {
                    err = _err;
                }
            });

            return err === undefined;
        }
    )
];

export function rustAchievements() {
    return achievements;
}