import {Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {Note} from "../notes/note.entity";
import {Tag} from "../tags/tag.entity";

@Table({
    tableName: 'note_tag',
    version: true,
    timestamps: true,
    underscored: true
})
export class NoteTag extends Model<NoteTag> {
    @ForeignKey(() => Note)
    @Column
    noteId: number;

    @ForeignKey(() => Tag)
    @Column
    tagId: number;
}
