import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";

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
}
