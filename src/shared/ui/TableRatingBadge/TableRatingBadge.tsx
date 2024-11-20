import { Tag } from "primereact/tag";

export interface TableRatingBadgeProps {
    value: string;
}
export const TableRatingBadge = ({ value }: TableRatingBadgeProps) => {
    return <Tag severity="success" value={value} />;
};
