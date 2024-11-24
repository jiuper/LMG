import { forwardRef, useImperativeHandle } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import { districts } from "@/components/_Modals/ModalAdministeredPages/const";
import { ContentSatus } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { Dropdown } from "@/shared/ui/_Dropdown";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import CustomFileUpload from "@/shared/ui/CustomFileUpload/CustomFileUpload";

import styles from "./ModalAdministeredPages.module.scss";

const cx = cnBind.bind(styles);

export const MODAL_ADMINISTERED_PAGES_DEFAULT_VALUES: ModalAdministeredPagesState = {
    status: ContentSatus.PUBLISHED,
    title: "",
    description: "",
    subtitle: "",
    file: null,
    pictureId: "",
};

export type ModalAdministeredPagesModel = ModalAdministeredPagesState;

export type ModalAdministeredPagesState = {
    id?: string;
    number?: number;
    title?: string;
    description?: string;
    subtitle?: string;
    districtId?: string;
    pictureId?: string;
    status?: ContentSatus;
    file?: File | null;
};

export type ModalAdministeredPagesRef = {
    setFormValues: (values: ModalAdministeredPagesModel) => void;
    clearValues: () => void;
};

interface ModalAdministeredPagesProps {
    onSubmit: (data: ModalAdministeredPagesModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}
export const ModalAdministeredPages = forwardRef<ModalAdministeredPagesRef, ModalAdministeredPagesProps>(
    ({ isOpen, onClose, type, onSubmit, isLoading }, ref) => {
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_PAGES_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({ ...values });
            },
        });

        const isEditType = type === "edit";
        const modalHeaderTitle = isEditType ? "Редактировать район" : "Добавить район";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";

        useImperativeHandle(ref, () => ({
            setFormValues: (values) =>
                formik.setFormikState((state) => ({ ...state, values: { ...state.values, ...values } })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_ADMINISTERED_PAGES_DEFAULT_VALUES },
                })),
        }));

        return (
            <Modal
                hasHeader={modalHeaderTitle}
                maxWidth="100%"
                maxHeight="100%"
                isOpen={isOpen}
                onClose={onClose}
                className={cx("modal")}
            >
                <form onSubmit={formik.handleSubmit} className={cx("form")}>
                    <Dropdown
                        isFullWidth
                        label="Район"
                        options={districts}
                        optionLabel="value"
                        name="districtName"
                        value={formik.values.districtId || districts[0].value}
                        onChange={(e) => formik.setFieldValue("districtId", e.value)}
                    />
                    <InputText
                        isFullWidth
                        label="Заголовок"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <InputTextarea
                        isFullWidth
                        label="Описание"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <CustomFileUpload
                        value={formik.values.file || null}
                        name="file"
                        onChange={(e) => formik.setFieldValue("file", e)}
                        fileStr={formik.values.pictureId}
                    />
                    <InputTextarea
                        isFullWidth
                        label="Подзаголовок"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <div className={cx("btns")}>
                        <Button label="Сохранить как черновик" variant="solid" type="submit" loading={isLoading} />
                        <Button label={submitBntLabel} variant="solid" type="submit" loading={isLoading} />
                    </div>
                </form>
            </Modal>
        );
    },
);
