export class NoteCreatedEvent {
    constructor(
       public readonly noteId: String,
       public readonly userId: String,
       public readonly price: number,
    ) {}
}
