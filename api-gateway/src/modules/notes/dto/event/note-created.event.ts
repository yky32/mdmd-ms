export class NoteCreatedEvent {
    constructor(
       public readonly title: String,
       public readonly description: String,
       public readonly cover: string,
    ) {}

    toString() {
        return JSON.stringify({
            orderId: this.title,
            userId: this.description,
            price: this.cover,
        });
    }
}
