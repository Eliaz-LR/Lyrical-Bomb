export class user {
    socketID: string;
    username: string;
    constructor(socketID: string) {
        this.socketID = socketID;
        this.username = "";
    }
    setUsername(username: string) {
        this.username = username;
    }
    toString() {
        if (this.username !== "") {
            return this.username;
        }
        return this.socketID;
    }
}

export class users {
    users: user[];
    constructor(user: user) {
        this.users = [user];
    }
    push(user: user) {
        this.users.push(user);
    }
    findUserBySocketID(socketID: string): user | undefined {
        return this.users.find((user) => user.socketID === socketID);
    }
    findUserByUsername(username: string): user | undefined {
        return this.users.find((user) => user.username === username);
    }
}
