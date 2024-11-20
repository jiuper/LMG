import type { ColumnProps } from "primereact/column";
import type { DataTableValueArray } from "primereact/datatable";

export type SmartTableStructureItem<T extends DataTableValueArray[number]> = ColumnProps & {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
} & SmartTableStructureItemEditor<T>;

type SmartTableStructureItemEditor<T extends DataTableValueArray[number]> =
    | SmartTableStructureItemWithEditor<T>
    | SmartTableStructureItemWithoutEditor;
type SmartTableStructureItemWithEditor<T extends DataTableValueArray[number]> = {
    withEditor: true;
    editorModel: { label: string; icon?: string; callback: (col: T) => void }[];
};
type SmartTableStructureItemWithoutEditor = {
    withEditor?: false;
};
