import { turn } from "../../../../shared/turnType";
import wordDict from "../../wordDict.json";

export function generateWord(previousTurns?: turn[]): string {
  let word = wordDict[Math.floor(Math.random() * wordDict.length)];
  if (previousTurns === undefined) {
    return word;
  }
  if (previousTurns.find((turn) => turn.word === word) !== undefined) {
    return generateWord(previousTurns);
  }
  return word;
}
