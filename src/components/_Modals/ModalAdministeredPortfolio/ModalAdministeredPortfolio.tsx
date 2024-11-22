import { forwardRef, useImperativeHandle } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import { ContentSatus } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { Dropdown } from "@/shared/ui/_Dropdown";
import { InputText } from "@/shared/ui/_InputText";
import CustomFileUpload from "@/shared/ui/CustomFileUpload/CustomFileUpload";

import styles from "./ModalAdministeredPortfolio.module.scss";

const cx = cnBind.bind(styles);
export const MODAL_ADMINISTERED_PORTFOLIO_DEFAULT_VALUES: ModalAdministeredPortfolioState = {
    status: ContentSatus.PUBLISHED,
    title: "",
    description: "",
    categoryName: "",
    file: null,
    pictureId: "",
};

export type ModalAdministeredPortfolioModel = ModalAdministeredPortfolioState;

export type ModalAdministeredPortfolioState = {
    id?: string;
    number?: number;
    title?: string;
    description?: string;
    categoryName?: string;
    status?: ContentSatus;
    pictureId?: string;
    file?: File | null;
};

export type ModalAdministeredPortfolioRef = {
    setFormValues: (values: ModalAdministeredPortfolioModel) => void;
    clearValues: () => void;
};

interface ModalAdministeredPortfolioProps {
    onSubmit: (data: ModalAdministeredPortfolioModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}
export const ModalAdministeredPortfolio = forwardRef<ModalAdministeredPortfolioRef, ModalAdministeredPortfolioProps>(
    ({ isOpen, onClose, type, onSubmit, isLoading }, ref) => {
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_PORTFOLIO_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({ ...values });
            },
        });

        const isEditType = type === "edit";
        const modalHeaderTitle = isEditType ? "Редактировать порфолио" : "Добавить порфолио";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";

        useImperativeHandle(ref, () => ({
            setFormValues: (values) =>
                formik.setFormikState((state) => ({ ...state, values: { ...state.values, ...values } })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_ADMINISTERED_PORTFOLIO_DEFAULT_VALUES },
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
                    <InputText
                        isFullWidth
                        label="Название кейса"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <InputText
                        isFullWidth
                        label="Описание кейса"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <Dropdown
                        isFullWidth
                        label="Категория"
                        options={[
                            "Лифты",
                            "Бизнес-центры",
                            "Жилые комплексы",
                            "Торговые центры",
                            "ПВЗ",
                            "Фитнес центры",
                        ]}
                        name="categoryName"
                        value={formik.values.categoryName}
                        onChange={formik.handleChange}
                    />
                    <CustomFileUpload
                        value={formik.values.file || null}
                        name="file"
                        onChange={(e) => formik.setFieldValue("file", e)}
                        fileStr={formik.values.pictureId}
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