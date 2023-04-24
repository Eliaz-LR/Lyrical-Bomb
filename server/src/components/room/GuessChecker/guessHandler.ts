import { extractLyrics } from "./extractLyrics";

export async function guessHandler(guess : string, word : string) {
    extractLyrics("https://genius.com/Travis-scott-sicko-mode-lyrics").then((lyrics) => {
        console.log(lyrics);
    });
    if (guess === word) {
        return true;
    } else {
        return false;
    }   
}