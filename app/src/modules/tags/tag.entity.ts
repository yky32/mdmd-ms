import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import {Note} from "../notes/note.entity";
import {NoteTag} from "../composite/note-tag.entity";

@Table({
    tableName: 'tags',
    version: true,
    timestamps: true,
    underscored: true
})
export class Tag extends Model<Tag> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column({field: 'name'})
    name: string;

    @BelongsToMany(() => Note, () => NoteTag)
    notes: Note[];
}
