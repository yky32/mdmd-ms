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
})
export class Tag extends Model<Tag> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column({field: 'name'})
    name: string;

    @CreatedAt
    @Column({field: 'created_at'})
    createdAt: Date;

    @UpdatedAt
    @Column({field: 'updated_at'})
    updatedAt: Date;
}
