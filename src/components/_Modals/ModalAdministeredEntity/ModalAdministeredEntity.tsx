import { forwardRef, useImperativeHandle, useState } from "react";
import cnBind from "classnames/bind";
import { useFormik } from "formik";

import { Modal } from "@/components/_Modals/Modal";
import type { ListItem } from "@/components/_Modals/ModalAdministeredEntity/List";
import { List } from "@/components/_Modals/ModalAdministeredEntity/List";
import { districts } from "@/components/_Modals/ModalAdministeredPages/const";
import { MapWrapper } from "@/components/Map";
import { ContentSatus } from "@/entities/types/entities";
import { Button } from "@/shared/ui/_Button";
import { InputText } from "@/shared/ui/_InputText";
import { InputTextarea } from "@/shared/ui/_InputTextarea";
import CustomFileUpload from "@/shared/ui/CustomFileUpload/CustomFileUpload";

import styles from "./ModalAdministeredEntity.module.scss";

const cx = cnBind.bind(styles);

export const MODAL_ADMINISTERED_ENTITY_DEFAULT_VALUES: ModalAdministeredEntityState = {
    status: ContentSatus.PUBLISHED,
    gTitle: "",
    name: "",
    wDescription: "",
    list: [{ title: "", value: "" }],
    coordinates: [],
    districtName: districts[0].value,
    file: null,
    pictureId: "",
    buildAreaCoordinates: [],
    gSubTitle: "",
};

export type ModalAdministeredEntityModel = ModalAdministeredEntityState;

export type ModalAdministeredEntityState = {
    id?: string;
    number?: number;
    name?: string;
    wDescription?: string;
    gTitle?: string;
    gSubTitle?: string;
    districtName?: string;
    coordinates?: [number, number][];
    buildAreaCoordinates?: [number, number][];
    list?: ListItem[];
    pictureId?: string;
    iconPictureId?: string;
    status?: ContentSatus;
    file?: File | null;
    categoryAreaId?: string;
};

export type ModalAdministeredEntityRef = {
    setFormValues: (values: ModalAdministeredEntityModel) => void;
    clearValues: () => void;
};

interface ModalAdministeredEntityProps {
    onSubmit: (data: ModalAdministeredEntityModel) => void;
    isOpen: boolean;
    onClose: () => void;
    type?: "create" | "edit";
    isLoading: boolean;
    errorMessage?: string;
}
export const ModalAdministeredEntity = forwardRef<ModalAdministeredEntityRef, ModalAdministeredEntityProps>(
    ({ isOpen, onClose, type, onSubmit, isLoading }, ref) => {
        const [submitStatus, setSubmitStatus] = useState(ContentSatus.PUBLISHED);
        const formik = useFormik({
            initialValues: MODAL_ADMINISTERED_ENTITY_DEFAULT_VALUES,
            onSubmit(values) {
                onSubmit({
                    ...values,
                    status: submitStatus,
                    buildAreaCoordinates: values.buildAreaCoordinates,
                    coordinates: values.coordinates,
                });
            },
        });

        const isEditType = type === "edit";
        const modalHeaderTitle = isEditType ? "Редактировать сущность" : "Добавить сущность";
        const submitBntLabel = isEditType ? "Редактировать" : "Создать";

        useImperativeHandle(ref, () => ({
            setFormValues: (values) =>
                formik.setFormikState((state) => ({ ...state, values: { ...state.values, ...values } })),
            clearValues: () =>
                formik.setFormikState((state) => ({
                    ...state,
                    values: { ...state.values, ...MODAL_ADMINISTERED_ENTITY_DEFAULT_VALUES },
                })),
        }));

        const handleOnChange = (mode: "placemark" | "polygon", coordinates: [number, number][]) => {
            if (mode === "placemark") {
                void formik.setFieldValue("coordinates", coordinates);
                void formik.setFieldValue("buildAreaCoordinates", []);
            } else {
                void formik.setFieldValue("buildAreaCoordinates", coordinates);
                void formik.setFieldValue("coordinates", []);
            }
        };

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
                    <div className={cx("block")}>
                        <span className={cx("title")}>Белый блок</span>
                        <div className={cx("block-fields")}>
                            <InputText
                                isFullWidth
                                label="Название"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            <InputTextarea
                                isFullWidth
                                label="Описание"
                                name="wDescription"
                                onChange={formik.handleChange}
                                value={formik.values.wDescription}
                            />
                        </div>
                    </div>
                    <div className={cx("block")}>
                        <div className={cx("block-fields")}>
                            <span className={cx("title")}>Координаты</span>
                            <div className={cx("block-fields")}>
                                <MapWrapper
                                    buildAreaCoordinates={formik.values.buildAreaCoordinates || []}
                                    coordinates={formik.values.coordinates}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className={cx("block-fields")}>
                            <span className={cx("title")}>Список</span>
                            <List
                                data={formik.values.list || []}
                                onChangeList={(list) => formik.setFieldValue("list", list)}
                            />
                        </div>
                    </div>
                    <div className={cx("block")}>
                        <span className={cx("title")}>Серый блок</span>
                        <div className={cx("block-fields")}>
                            <CustomFileUpload
                                value={formik.values.file || null}
                                name="file"
                                onChange={(e) => formik.setFieldValue("file", e)}
                                fileStr={formik.values.pictureId}
                            />
                            <InputTextarea
                                isFullWidth
                                label="Подзаголовок"
                                name="gTitle"
                                onChange={formik.handleChange}
                                value={formik.values.gTitle}
                            />
                            <InputTextarea
                                isFullWidth
                                label="Описание"
                                name="gSubTitle"
                                onChange={formik.handleChange}
                                value={formik.values.gSubTitle}
                            />
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
