export class user {
    socketID: string;
    username: string;
    isHost: boolean;
    numberOfHearts: number;
    constructor(socketID: string) {
        this.socketID = socketID;
        this.username = "";
        this.isHost = false;
        this.numberOfHearts = 3;
    }
    setUsername(username: string) {
        this.username = username;
    }
    setHost(isHost: boolean) {
        this.isHost = isHost;
    }
    toString() {
        if (this.username !== "") {
            return this.username;
        }
        return this.socketID;
    }
}

export class room {
    users: user[];
    isLaunched: boolean;
    roomID: string;
    timerID: NodeJS.Timer | undefined;
    constructor(user: user, roomID: string) {
        this.users = [user];
        this.roomID = roomID;
        this.isLaunched = false;
        this.timerID = undefined;
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
    containsHost(): boolean {
        return this.users.some((user) => user.isHost);
    }
}
