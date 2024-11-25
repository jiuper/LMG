import { forwardRef, useImperativeHandle, useState } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import { ContentSatus } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";
import CustomFileUpload from "@/shared/ui/CustomFileUpload/CustomFileUpload";

import styles from "./ModalAdministeredFeedBack.module.scss";

const cx = cnBind.bind(styles);
export const MODAL_ADMINISTERED_FEEDBACK_DEFAULT_VALUES: ModalAdministeredFeedbackState = {
    status: ContentSatus.PUBLISHED,
    title: "",
    description: "",
    video: null,
    file: null,
    pictureId: "",
};

export type ModalAdministeredFeedbackModel = ModalAdministeredFeedbackState;

export type ModalAdministeredFeedbackState = {
    id?: string;
    number?: number;
    title?: string;
    description?: string;
    video?: File | null;
    status?: ContentSatus;
    pictureId?: string;
    file?: File | null;
};

export type ModalAdministeredFeedbackRef = {
    setFormValues: (values: ModalAdministeredFeedbackModel) => void;
    clearValues: () => void;
};

interface ModalAdministeredFeedbackProps {
    onSubmit: (data: ModalAdministeredFeedbackModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}
export const ModalAdministeredFeedBack = forwardRef<ModalAdministeredFeedbackRef, ModalAdministeredFeedbackProps>(
    ({ isOpen, onClose, type, onSubmit, isLoading }, ref) => {
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_FEEDBACK_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({ ...values });
            },
        });

        const [isVideo, setIsVideo] = useState(false);

        const isEditType = type === "edit";
        const modalHeaderTitle = isEditType ? "Редактировать отзыв" : "Добавить отзыв";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";

        useImperativeHandle(ref, () => ({
            setFormValues: (values) =>
                formik.setFormikState((state) => ({ ...state, values: { ...state.values, ...values } })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_ADMINISTERED_FEEDBACK_DEFAULT_VALUES },
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

                    <div className={cx("picture")}>
                        <span className={cx("title")}> {isVideo ? "Видео" : "Изображение"}</span>
                        {isVideo ? (
                            <CustomFileUpload
                                value={formik.values.video || null}
                                name="file"
                                onChange={(e) => formik.setFieldValue("video", e)}
                                fileStr=""
                            />
                        ) : (
                            <CustomFileUpload
                                value={formik.values.file || null}
                                name="file"
                                onChange={(e) => formik.setFieldValue("file", e)}
                                fileStr={formik.values.pictureId}
                            />
                        )}
                        <Button
                            label={isVideo ? "Изображение" : "Видео"}
                            variant="solid"
                            onClick={() => {
                                setIsVideo(!isVideo);
                                formik.setFieldValue("file", null);
                                formik.setFieldValue("video", null);
                            }}
                        />
                    </div>

                    <div className={cx("btns")}>
                        <Button label="Сохранить как черновик" variant="solid" type="submit" loading={isLoading} />
                        <Button label={submitBntLabel} variant="solid" type="submit" loading={isLoading} />
                    </div>
                </form>
            </Modal>
        );
    },
);
