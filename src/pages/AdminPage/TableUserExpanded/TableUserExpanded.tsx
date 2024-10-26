import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { format } from "date-fns";
import { Column } from "primereact/column";
import type { DataTableRowData, DataTableValue } from "primereact/datatable";

import { getUserPaymentMethodsApi } from "@/api/getUserPaymentMethodsApi";
import { usePaymentMethodDeleteMutation } from "@/api/paymentMethodDeleteApi";
import { ConfirmModal } from "@/components/_Modals/ConfirmModal";
import { useConfirmModal } from "@/components/_Modals/ConfirmModal/ConfirmModal";
import { SmartTable } from "@/components/SmartTable";
import type { SmartTableStructureItem } from "@/components/SmartTable/types";
import type { PaymentsMethod, UserEntity } from "@/entities/types/entities";
import { IcTrash } from "@/shared/assets/icons";
import { ActionButton } from "@/shared/ui/ActionButton";

import styles from "./TableUserExpanded.module.scss";

const cx = cnBind.bind(styles);

export type TableUserExpandedProps = DataTableRowData<UserEntity[]>;
export const TableUserExpanded = memo(({ id }: TableUserExpandedProps) => {
    const { withConfirm, modalProps: confirmModalProps } = useConfirmModal();
    const { data, fetchStatus, refetch } = useQuery({
        queryKey: ["expanded-user", id],
        queryFn: () => getUserPaymentMethodsApi({ id }),
        staleTime: 0,
    });
    const { mutate: deletePaymentMethod } = usePaymentMethodDeleteMutation();

    const structure: SmartTableStructureItem<DataTableValue>[] = [
        { field: "id", header: "Id", sortable: true },
        { field: "paymentMethod", header: "Payment Method" },
        { field: "walletAddress", header: "Wallet Address" },
        { field: "createdBy", header: "Created By" },
        {
            field: "createdDate",
            header: "Created Date",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
        },
        { field: "updatedBy", header: "Updated By" },
        {
            field: "updatedDate",
            header: "Updated Date",
            body: ({ createdDate }) => format(new Date(createdDate as string), "MM.dd.yyyy KK:mm a"),
        },
    ];

    const handleDeletePaymentMethod = (rowData: PaymentsMethod) => () => {
        withConfirm({
            header: "Удалить?",
            message: `Удаление этого метода оплаты "${rowData.title}" может привести к необратимой потере данных`,
            onSubmit: () => deletePaymentMethod({ id: rowData.id }, { onSuccess: () => refetch() }),
            onClose: () => undefined,
        });
    };

    const rowEditorTemplate = (data: PaymentsMethod) => {
        return (
            <ActionButton
                menuItems={[{ label: "Удалить", icon: "pi pi-trash", callback: handleDeletePaymentMethod(data) }]}
            />
        );
    };

    return (
        <>
            <SmartTable<PaymentsMethod[]>
                className={cx("table")}
                structure={structure}
                value={data?.data || []}
                status={fetchStatus}
                scrollHeight="flex"
                responsiveLayout="scroll"
                rows={data?.count || 0}
                sortField="id"
                sortOrder={-1}
                scrollable
                removableSort
            >
                <Column header="Действия" frozen alignFrozen="right" body={rowEditorTemplate} />
            </SmartTable>
            <ConfirmModal
                {...confirmModalProps}
                submitBtnParams={{
                    severity: "danger",
                    iconPos: "left",
                    icon: <IcTrash />,
                    label: "Удалить",
                }}
            />
        </>
    );
});
