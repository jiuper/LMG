import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import { MODAL_ADMINISTERED_NEWS_DEFAULT_VALUES } from "@/components/_Modals/ModalAdministeredNews";
import { List } from "@/components/_Modals/ModalAdministeredNews/List/List";
import type { GetItemDto, ListDto } from "@/entities/types/entities";
import { ContentSatus } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import CustomFileUpload from "@/shared/ui/CustomFileUpload";

import styles from "./ModalAdministeredArticle.module.scss";

const cx = cnBind.bind(styles);

export const MODAL_ADMINISTERED_ARTICLE_DEFAULT_VALUES: ModalAdministeredArticleState = {
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

export type ModalAdministeredArticleModel = ModalAdministeredArticleState;

export type ModalAdministeredArticleState = {
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

export type ModalAdministeredArticleRef = {
    setFormValues: (values: ModalAdministeredArticleModel) => void;
    clearValues: () => void;
};

interface ModalAdministeredArticleProps {
    onSubmit: (data: ModalAdministeredArticleModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}

export const ModalAdministeredArticle = forwardRef<ModalAdministeredArticleRef, ModalAdministeredArticleProps>(
    ({ type, errorMessage, onClose, isOpen, isLoading, onSubmit }, ref) => {
        const [submitStatus, setSubmitStatus] = useState(ContentSatus.PUBLISHED);
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_NEWS_DEFAULT_VALUES,
            validate(values) {
                const errors: Record<string, string> = {};

                const hasExistingImage = values.pictureName || values.contentItems?.some((item) => item.pictureName);
                const hasNewFiles = values.files && values.files.length > 0;

                // Проверяем, есть ли первая картинка, только если ее нет в `pictureName` или `contentItems`
                if (!hasNewFiles && !hasExistingImage) {
                    errors.files = "Первая картинка обязательна";
                }

                return errors;
            },

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

                // Не заменяем `pictureName`, если новый файл не загружен
                const pictureName = isFilesNotEmpty
                    ? files[0]?.name
                    : values.pictureName || contentItems[0]?.pictureName || "";

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

        const [isVideoOpen, setIsVideoOpen] = useState(false);
        const [isListTextOpen, setIsListTextOpen] = useState<ListDto[]>([]);
        const onChangeList = (list: ListDto, index: number) => {
            setIsListTextOpen((prev) => prev.map((el, i) => (i === index ? list : el)));
        };

        const isEditType = type === "edit";
        const modalHeaderTitle = isEditType ? "Редактировать статью" : "Добавить статью";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";
        useImperativeHandle(ref, () => ({
            setFormValues: (values) => {
                formik.setFormikState((state) => ({
                    ...state,
                    values: {
                        ...MODAL_ADMINISTERED_NEWS_DEFAULT_VALUES,
                        ...values,
                        files: values.files || [], // Не затираем files в `null`
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
                        required={formik.values.files?.[0] !== null}
                    />
                    <InputTextarea
                        isFullWidth
                        label="Содержание 1"
                        name="contentItems[0].text"
                        onChange={formik.handleChange}
                        value={formik.values.contentItems?.[0]?.text || ""}
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
                    {!isVideoOpen ? (
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
                            {isVideoOpen ? (
                                <div onClick={() => setIsVideoOpen(!isVideoOpen)}>Картинка</div>
                            ) : (
                                <div onClick={() => setIsVideoOpen(!isVideoOpen)}>Видео</div>
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
