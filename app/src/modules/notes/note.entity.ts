import {AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';

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
}


export interface NoteMetadata {
    title: string;
    description: string;
    cover: string;
}

export interface NoteContext {
    data: string;
}
