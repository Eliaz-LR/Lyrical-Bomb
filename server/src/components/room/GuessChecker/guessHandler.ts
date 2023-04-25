import { extractLyrics } from "./extractLyrics";

export async function guessHandler(guess : string, word : string): Promise<{ match : boolean , text : string }> {
    //request from Genius API the first song corresponding to the guess
    const searchUrl = 'https://api.genius.com/search?q=';
    const API_KEY = process.env.GENIUS_API_KEY || "_tk1JtnbRcsxWpTBdMCc7sn6vxGa-0gnNCWeZ4VijOto5vgxP_8xr_cbjC4jwK4i";
    console.log(API_KEY);
    let response = await fetch(searchUrl + guess+ "&access_token="+API_KEY );
    let data = await response.json();
    let songURL = data.response.hits[0].result.url;
    let songText = data.response.hits[0].result.title + " - " + data.response.hits[0].result.artist_names;
    let lyrics = await extractLyrics(songURL)
    lyrics = lyrics.toLowerCase();
    let match = lyrics.includes(word) || lyrics.includes(word+"s");
    let validGuess = match && guess !== word;
    return {match : validGuess, text : songText};
}