import { ColumnModel } from "./ColumnModel";

export interface FormattedTableEntity {
    _id: string,
    columns: ColumnModel[],
    name: string,
    imgUrl: string
}