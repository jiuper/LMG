import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import { List } from "@/components/_Modals/ModalAdministeredNews/List/List";
import type { GetItemDto, ListDto } from "@/entities/types/entities";
import { ContentSatus } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import CustomFileUpload from "@/shared/ui/CustomFileUpload";

import styles from "./ModalAdministeredNews.module.scss";

const cx = cnBind.bind(styles);

export const MODAL_ADMINISTERED_NEWS_DEFAULT_VALUES: ModalAdministeredNewsState = {
    contentItems: [],
    status: ContentSatus.PUBLISHED,
    time: "",
    subtitle: "",
    title: "",
    video: null,
    files: [],
    pictureName: "",
    videoId: null,
};

export type ModalAdministeredNewsModel = ModalAdministeredNewsState;

export type ModalAdministeredNewsState = {
    id?: string;
    number?: number;
    title?: string;
    subtitle?: string;
    time?: string;
    video?: File | null;
    pictureName?: string;
    files?: File[];
    pictureId?: string;
    status: ContentSatus;
    contentItems?: GetItemDto[];
    list?: ListDto[];
    videoId?: string | null;
};

export type ModalAdministeredNewsRef = {
    setFormValues: (values: ModalAdministeredNewsModel) => void;
    clearValues: () => void;
};

interface ModalAdministeredNewsProps {
    onSubmit: (data: ModalAdministeredNewsModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}

export const ModalAdministeredNews = forwardRef<ModalAdministeredNewsRef, ModalAdministeredNewsProps>(
    ({ type, errorMessage, onClose, isOpen, isLoading, onSubmit }, ref) => {
        const [submitStatus, setSubmitStatus] = useState(ContentSatus.PUBLISHED);
        const [isVideoOpen, setIsVideoOpen] = useState(false);
        const [isListTextOpen, setIsListTextOpen] = useState<ListDto[]>([]);
        const isEditType = type === "edit";
        const modalHeaderTitle = isEditType ? "Редактировать новость" : "Добавить новость";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";

        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_NEWS_DEFAULT_VALUES,

            onSubmit(values) {
                const files = values.files || [];
                const contentItems = values.contentItems || [];
                const isFilesNotEmpty = files.length > 0 && files.some((file) => file instanceof File);
                let updatedContentItems = [...contentItems];

                if (isFilesNotEmpty) {
                    updatedContentItems = updatedContentItems.map((el, index) => {
                        const file = files[index];

                        return {
                            ...el,
                            pictureName: file ? file.name : el.pictureName || "",
                        };
                    });

                    if (files.length > contentItems.length) {
                        files.slice(contentItems.length).forEach((file) => {
                            if (file) {
                                updatedContentItems.push({ pictureName: file.name });
                            }
                        });
                    }
                }

                const pictureName = isFilesNotEmpty
                    ? files[0]?.name
                    : values.pictureName || contentItems[0]?.pictureName || "";

                if (!isVideoOpen) {
                    updatedContentItems = updatedContentItems.filter((_, index) => index !== 1); // Удаляем второй элемент
                }

                const submitData = {
                    ...values,
                    status: submitStatus,
                    list: isListTextOpen,
                    pictureName,
                    contentItems: updatedContentItems,
                    files: isFilesNotEmpty ? files : [],
                };

                onSubmit(submitData);
            },
        });

        useImperativeHandle(ref, () => ({
            setFormValues: (values) => {
                formik.setFormikState((state) => ({
                    ...state,
                    values: {
                        ...MODAL_ADMINISTERED_NEWS_DEFAULT_VALUES,
                        ...values,
                        files: values.files || [],
                    },
                }));
            },
            clearValues: () => {
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_ADMINISTERED_NEWS_DEFAULT_VALUES },
                }));
            },
        }));

        useEffect(() => {
            if (formik.values.list && isEditType) setIsListTextOpen(formik.values.list);

            if (formik.values.list && !isEditType) setIsListTextOpen([]);
        }, [formik.values.list, isEditType]);

        const onChangeList = (list: ListDto, index: number) => {
            setIsListTextOpen((prev) => prev.map((el, i) => (i === index ? list : el)));
        };

        return (
            <Modal maxWidth="100%" maxHeight="100%" isOpen={isOpen} hasHeader={modalHeaderTitle} onClose={onClose}>
                <form onSubmit={formik.handleSubmit} className={cx("form")}>
                    <InputText
                        isFullWidth
                        label="Заголовок"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <InputText
                        isFullWidth
                        label="Подзаголовок"
                        name="subtitle"
                        onChange={formik.handleChange}
                        value={formik.values.subtitle}
                    />
                    <InputText
                        isFullWidth
                        label="Время на прочтение"
                        name="time"
                        onChange={formik.handleChange}
                        value={formik.values.time}
                    />
                    <CustomFileUpload
                        value={formik.values.files?.[0] || null}
                        name="files[0]"
                        onChange={(e) => formik.setFieldValue("files[0]", e)}
                        fileStr={formik.values.contentItems?.[0]?.pictureId}
                        onDelete={() => formik.setFieldValue("contentItems.[0].pictureId", "")}
                    />
                    <InputTextarea
                        isFullWidth
                        label="Содержание 1"
                        name="contentItems[0].text"
                        onChange={formik.handleChange}
                        value={formik.values.contentItems?.[0]?.text}
                    />
                    {isListTextOpen.length !== 0 && (
                        <div className={cx("list-blocks")}>
                            <span>Списки</span>
                            {isListTextOpen.map((el, index) => (
                                <div key={index} className={cx("list-wrapper")}>
                                    <List onChangeList={onChangeList} index={index + 1} data={el} />
                                </div>
                            ))}
                            <div className={cx("buttons")}>
                                <Button
                                    className={cx("add-btn")}
                                    onClick={() => setIsListTextOpen((prev) => [...prev, { title: "", items: [] }])}
                                >
                                    Добавить список
                                </Button>
                                <Button
                                    className={cx("remove-btn")}
                                    onClick={() => setIsListTextOpen((prev) => prev.slice(0, -1))}
                                >
                                    Удалить список
                                </Button>
                            </div>
                        </div>
                    )}
                    <InputTextarea
                        isFullWidth
                        label="Содержание 2"
                        name="contentItems[1].text"
                        onChange={formik.handleChange}
                        value={formik.values.contentItems?.[1]?.text || ""}
                    />
                    {isVideoOpen ? (
                        <CustomFileUpload
                            value={formik.values.files?.[1] || null}
                            name="files[1]"
                            onChange={(e) => formik.setFieldValue("files[1]", e)}
                            fileStr={formik.values.contentItems?.[1]?.pictureId}
                            onDelete={() => formik.setFieldValue("contentItems.[1].pictureId", "")}
                        />
                    ) : (
                        <CustomFileUpload
                            value={formik.values.video || null}
                            name="video"
                            onChange={(e) => formik.setFieldValue("video", e)}
                            fileStr=""
                        />
                    )}
                    <div className={cx("block")}>
                        <span className={cx("label")}>Добавить блок</span>
                        <div className={cx("list")}>
                            {!isVideoOpen ? (
                                <div
                                    onClick={() => {
                                        setIsVideoOpen(true);
                                        formik.setFieldValue("video", null);
                                        formik.setFieldValue("videoId", "");
                                        formik.setFieldValue("files", []);
                                    }}
                                >
                                    Картинка
                                </div>
                            ) : (
                                <div
                                    onClick={() => {
                                        setIsVideoOpen(false);
                                        formik.setFieldValue("contentItems.[1].pictureId", "");
                                        formik.setFieldValue("files", []);
                                    }}
                                >
                                    Видео
                                </div>
                            )}
                            <div onClick={() => setIsListTextOpen((prev) => [...prev, { title: "", items: [] }])}>
                                Список
                            </div>
                        </div>
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
