import {AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';

@Table
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

    @CreatedAt
    @Column({field: 'created_at'})
    createdAt: Date;

    @UpdatedAt
    @Column({field: 'updated_at'})

    updatedAt: Date;
}


export interface NoteMetadata {
    title: string;
    description: string;
    cover: string;
}

export interface NoteContext {
    data: string;
}
