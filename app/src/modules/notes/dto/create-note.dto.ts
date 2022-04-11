export class CreateNoteDto {

    public readonly title: string
    public readonly description: string
    public readonly cover: string

    toString() {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            cover: this.cover,
        });
    }
}
