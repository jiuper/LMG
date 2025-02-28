import React, { useRef, useState } from "react";
import cnBind from "classnames/bind";
import { ProgressSpinner } from "primereact/progressspinner";

import type { ErrorsM, templateCreateApiParams } from "@/api/createTemplateApi";
import { useCreateTemplateApi } from "@/api/createTemplateApi";
import { templateDataDownloadApi } from "@/api/downloadDataTemplateApi";
import { useToast } from "@/shared/context";
import { Button } from "@/shared/ui/_Button";

import styles from "./TemplateToolbar.module.scss";

type UploadResponse = ErrorsM & {};
const cx = cnBind.bind(styles);

export const TemplateToolbar: React.FC = () => {
    const toast = useToast();
    const { mutate: templateCreate, isPending: isLoading } = useCreateTemplateApi();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);

            toast?.({
                severity: "success",
                summary: "Успех",
                detail: "Файл выбран",
            });
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = () => {
        if (!file) return;

        const params: templateCreateApiParams = { file };

        templateCreate(params, {
            onSuccess: (data: UploadResponse) => {
                const detailMessage = data.errors
                    ? Object.values(data.errors).flat().join(", ") // Если есть ошибки, соединяем их в строку
                    : "Файл успешно загружен"; // Дефолтное сообщение

                toast?.({
                    severity: data.errors ? "error" : "success",
                    summary: data.errors ? "Ошибка" : "Успех",
                    detail: detailMessage,
                });

                setFile(null);
            },
            onError: (error: any) => {
                // Проверяем, если есть ошибки в теле ответа
                const errors = error?.response?.data?.errors;
                const errorMessage = errors
                    ? Object.values(errors).flat().join(", ") // Соединяем все ошибки в строку
                    : error?.message || "Ошибка загрузки файла";

                toast?.({
                    severity: "error",
                    summary: "Ошибка",
                    detail: errorMessage,
                });
            },
        });
    };

    const handleDataDownload = async () => {
        const res = await templateDataDownloadApi("parser/download-current", "template.xlsx");
        toast?.({
            severity: res.success ? "success" : "error",
            summary: res.success ? "Успех" : "Ошибка",
            detail: res.message,
        });
    };

    const handleTemplateDownload = async () => {
        const res = await templateDataDownloadApi("parser/download-template", "template.xlsx");
        toast?.({
            severity: res.success ? "success" : "error",
            summary: res.success ? "Успех" : "Ошибка",
            detail: res.message,
        });
    };

    return (
        <div className={cx("block-toolbar")}>
            {!isLoading ? (
                <>
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                    <Button
                        disabled={isLoading}
                        className={cx("btn-neon")}
                        label="Выбрать файл для загрузки"
                        onClick={handleUploadClick}
                    />
                    <Button
                        className={cx("btn-neon")}
                        label="Загрузить файл"
                        onClick={handleFileUpload}
                        disabled={!file || isLoading}
                    />
                    <Button className={cx("btn-neon")} label="Выгрузить данные" onClick={handleDataDownload} />
                    <Button className={cx("btn-neon")} label="Скачать шаблон" onClick={handleTemplateDownload} />
                </>
            ) : (
                <div className={cx("loader")}>
                    <span>Идет обработка и загрузка шаблона</span>
                    <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="4" />
                </div>
            )}
        </div>
    );
};
