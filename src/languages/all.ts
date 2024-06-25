import { Achievement } from "../achievements";
import { javascriptAchievements } from "./javascript";
import { rustAchievements } from "./rust";

export function allAchievements(): Array<Achievement> {
    let achievements: Array<Achievement> = [];

    achievements = achievements.concat(rustAchievements());
    achievements = achievements.concat(javascriptAchievements());

    return achievements;
}