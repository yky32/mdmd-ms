export class CreateTagDto {
    public readonly name: string;

    toString() {
        return JSON.stringify({
            name: this.name
        })
    }
}
