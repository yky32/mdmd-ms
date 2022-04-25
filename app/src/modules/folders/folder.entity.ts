import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table({
    tableName: 'folders',
    version: true,
    timestamps: true,
    underscored: true
})
export class Folder extends Model<Folder>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column({field: 'name'})
    name: string;
}
