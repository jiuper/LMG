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
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_ARTICLE_DEFAULT_VALUES,
            onSubmit(values) {
                console.log(values);
                onSubmit({
                    ...values,
                    list: isListTextOpen,
                    pictureName: values.files?.[0]?.name,
                    contentItems: values.contentItems?.length
                        ? values.contentItems.map((el, index) => ({
                              ...el,
                              pictureName: values.files?.filter((file) => file)[index]?.name || "",
                          }))
                        : values.files?.filter((file) => file).map((file) => ({ pictureName: file.name })),
                });
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
            setFormValues: (values) =>
                formik.setFormikState((state) => ({ ...state, values: { ...state.values, ...values } })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_ADMINISTERED_ARTICLE_DEFAULT_VALUES },
                })),
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
                    <CustomFileUpload
                        value={formik.values.files?.[0] || null}
                        name="files[0]"
                        onChange={(e) => formik.setFieldValue("files[0]", e)}
                        fileStr={formik.values.contentItems?.[0]?.pictureId}
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
                        <Button label="Сохранить как черновик" variant="solid" type="submit" loading={isLoading} />
                        <Button label={submitBntLabel} variant="solid" type="submit" loading={isLoading} />
                    </div>
                </form>
            </Modal>
        );
    },
);
