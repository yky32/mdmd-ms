import {AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Tag} from "../tags/tag.entity";
import {NoteTag} from "../composite/note-tag.entity";

@Table({
    tableName: 'notes',
    version: true,
    timestamps: true,
    underscored: true
})
export class Note extends Model<Note> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    metadata: NoteMetadata;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    context: NoteContext;

    @BelongsToMany(() => Tag, () => NoteTag)
    tags: Tag[]
}


export interface NoteMetadata {
    title: string;
    description: string;
    cover: string;
}

export interface NoteContext {
    data: string;
}
