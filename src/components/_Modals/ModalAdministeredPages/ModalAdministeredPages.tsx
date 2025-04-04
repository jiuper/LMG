import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { getDistrictsListApi } from "@/api/getDistrictsListApi";
import type { GetDistrictsListApiRawResponse } from "@/api/getDistrictsListApi/types";
import { Modal } from "@/components/_Modals/Modal";
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
    subTitle: "",
    file: null,
    pictureId: "",
};

export type ModalAdministeredPagesModel = ModalAdministeredPagesState;

export type ModalAdministeredPagesState = {
    id?: string;
    number?: number;
    title?: string;
    description?: string;
    subTitle?: string;
    districtId?: string;
    pictureId?: string;
    status?: ContentSatus;
    file?: File | null;
    categoryId?: string;
    seoTitle?: string;
    seoDescription?: string;
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
        const [submitStatus, setSubmitStatus] = useState(ContentSatus.PUBLISHED);
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_PAGES_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({ ...values, status: submitStatus });
            },
        });

        const { data } = useQuery<GetDistrictsListApiRawResponse>({
            queryKey: ["districts"],
            queryFn: () => getDistrictsListApi(),
        });

        const listData = useMemo(() => data || [], [data]);

        const parseListData = useMemo(() => listData.map((item) => ({ label: item.name, id: item.id })), [listData]);
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
                        options={parseListData}
                        optionLabel="label"
                        optionValue="id"
                        name="districtName"
                        value={formik.values.districtId}
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
                        name="subTitle"
                        onChange={formik.handleChange}
                        value={formik.values.subTitle}
                    />
                    <div className={cx("seo")}>
                        <span>Сео теги</span>
                        <InputText
                            isFullWidth
                            label="Заголовок"
                            name="seoTitle"
                            onChange={formik.handleChange}
                            value={formik.values.seoTitle}
                        />
                        <InputText
                            isFullWidth
                            label="Описание"
                            name="seoDescription"
                            onChange={formik.handleChange}
                            value={formik.values.seoDescription}
                        />
                    </div>
                    <div className={cx("btns")}>
                        <Button
                            label="Сохранить как черновик"
                            variant="solid"
                            type="submit"
                            loading={isLoading}
                            onClick={() => setSubmitStatus(ContentSatus.DRAFT)}
                        />
                        <Button
                            label={submitBntLabel}
                            variant="solid"
                            type="submit"
                            loading={isLoading}
                            onClick={() => setSubmitStatus(ContentSatus.PUBLISHED)}
                        />
                    </div>
                </form>
            </Modal>
        );
    },
);
