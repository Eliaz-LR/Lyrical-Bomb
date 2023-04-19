import { user } from "./userTypes";

export class turn {
    word : string;
    user : user;
    constructor(user : user, word : string) {
        this.user = user;
        this.word = word;
    }
}