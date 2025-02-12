import { forwardRef, useImperativeHandle, useState } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import { List } from "@/components/_Modals/ModalAdministeredCategory/List";
import { ContentSatus } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import CustomFileUpload from "@/shared/ui/CustomFileUpload";

import styles from "./ModalAdministeredCategory.module.scss";

const cx = cnBind.bind(styles);

export const MODAL_ADMINISTERED_CATEGORY_DEFAULT_VALUES: ModalAdministeredCategoryState = {
    status: ContentSatus.PUBLISHED,
    title: "",
    description: "",
    list: {
        title: "",
        items: [
            { caption: "", subcaption: "" },
            { caption: "", subcaption: "" },
            { caption: "", subcaption: "" },
        ],
    },
    video: null,
    subtitle: "",
    file: null,
    pictureId: "",
    previewPictureId: "",
    previewPictureFile: null,
    iconPictureId: "",
    icon: null,
};

export type ModalAdministeredCategoryModel = ModalAdministeredCategoryState;

export type ModalAdministeredCategoryState = {
    id?: string;
    number?: number;
    title?: string;
    description?: string;
    subtitle?: string;
    pictureId?: string;
    videoId?: string;
    list?: { title: string; items: { caption: string; subcaption: string }[] };
    status?: ContentSatus;
    file?: File | null;
    video?: File | null;
    sectionId?: string;
    previewPictureId?: string;
    previewPictureFile?: File | null;
    iconPictureId?: string;
    icon?: File | null;
};

export type ModalAdministeredCategoryRef = {
    setFormValues: (values: ModalAdministeredCategoryModel) => void;
    clearValues: () => void;
};

interface ModalAdministeredCategoryProps {
    onSubmit: (data: ModalAdministeredCategoryModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}
export const ModalAdministeredCategory = forwardRef<ModalAdministeredCategoryRef, ModalAdministeredCategoryProps>(
    ({ isOpen, onClose, type, onSubmit, isLoading }, ref) => {
        const [submitStatus, setSubmitStatus] = useState(ContentSatus.PUBLISHED);
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_CATEGORY_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({ ...values, status: submitStatus });
            },
        });

        const isEditType = type === "edit";
        const modalHeaderTitle = isEditType ? "Редактировать категорию" : "Добавить категорию";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";

        useImperativeHandle(ref, () => ({
            setFormValues: (values) =>
                formik.setFormikState((state) => ({ ...state, values: { ...state.values, ...values } })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_ADMINISTERED_CATEGORY_DEFAULT_VALUES },
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
                    <div className={cx("picture")}>
                        <span>Иконка категории</span>
                        <CustomFileUpload
                            value={formik.values.icon || null}
                            name="icon"
                            onChange={(e) => formik.setFieldValue("icon", e)}
                            fileStr={formik.values.iconPictureId}
                        />
                    </div>
                    <div className={cx("picture")}>
                        <span>Изображение превью</span>
                        <CustomFileUpload
                            value={formik.values.previewPictureFile || null}
                            name="previewPictureFile"
                            onChange={(e) => formik.setFieldValue("previewPictureFile", e)}
                            fileStr={formik.values.previewPictureId}
                        />
                    </div>
                    <div className={cx("picture")}>
                        <span>Изображение </span>
                        <CustomFileUpload
                            value={formik.values.file || null}
                            name="file"
                            onChange={(e) => formik.setFieldValue("file", e)}
                            fileStr={formik.values.pictureId}
                        />
                    </div>
                    <div className={cx("picture")}>
                        <span>Список </span>
                        <List
                            onChangeList={(e) => formik.setFieldValue("list", e)}
                            data={formik.values.list || ({} as any)}
                        />
                    </div>
                    <div className={cx("picture")}>
                        <span>Видео</span>
                        <CustomFileUpload
                            value={formik.values.video || null}
                            name="file"
                            onChange={(e) => formik.setFieldValue("video", e)}
                            fileStr=""
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
