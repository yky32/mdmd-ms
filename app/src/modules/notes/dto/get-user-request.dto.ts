export class GetUserRequest {
    constructor(public readonly userId: String) {
    }
    toString() {
        return JSON.stringify({
            userId: this.userId,
        });
    }
}
