export interface TableRatingBadgeProps {
    value: boolean;
}
export const TableStatusCrossBadge = ({ value }: TableRatingBadgeProps) => {
    return <i className={`pi ${value ? "pi-check" : "pi-times"}`} />;
};
