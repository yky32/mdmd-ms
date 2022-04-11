export class NoteCreatedEvent {
    constructor(
       public readonly title: String,
       public readonly description: String,
       public readonly cover: string,
    ) {}

    toString() {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            cover: this.cover,
        });
    }
}
