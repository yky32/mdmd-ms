export class CreateNoteDto {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly cover: string,
        public readonly content: string,
        public readonly tagIds: string[],
    ) {}

    toString() {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            cover: this.cover,
            content: this.content,
            tagIds: this.tagIds
        });
    }
}
