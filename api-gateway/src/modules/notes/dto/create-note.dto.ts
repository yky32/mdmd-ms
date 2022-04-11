export class CreateNoteDto {
    constructor(
       public readonly title: string,
       public readonly description: string,
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
