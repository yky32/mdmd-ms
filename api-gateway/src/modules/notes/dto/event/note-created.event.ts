export class NoteCreatedEvent {
    constructor(
       public readonly noteId: String,
       public readonly userId: String,
       public readonly price: number,
    ) {}

    toString() {
        return JSON.stringify({
            orderId: this.noteId,
            userId: this.userId,
            price: this.price,
        });
    }
}
