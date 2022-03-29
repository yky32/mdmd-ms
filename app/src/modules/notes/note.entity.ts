import {Table, Column, Model, DataType, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export class Note extends Model<Note> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
}