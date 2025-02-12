import React, { useRef, useState } from "react";
import cnBind from "classnames/bind";
import { ProgressSpinner } from "primereact/progressspinner";

import type { templateCreateApiParams } from "@/api/createTemplateApi";
import { useCreateTemplateApi } from "@/api/createTemplateApi";
import { templateDataDownloadApi } from "@/api/downloadDataTemplateApi";
import { useToast } from "@/shared/context";
import { Button } from "@/shared/ui/_Button";

import styles from "./TemplateToolbar.module.scss";

type UploadResponse = { message: string } | string[];
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
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileUpload = () => {
        if (file) {
            const params: templateCreateApiParams = { file };

            templateCreate(params, {
                onSuccess: (data: UploadResponse) => {
                    const detailMessage = Array.isArray(data)
                        ? data.join(", ") // Если массив, соединяем в строку
                        : "message" in data // Если объект содержит `message`
                          ? data.message
                          : "Файл успешно загружен"; // Дефолтное сообщение

                    toast?.({
                        severity: "success",
                        summary: "Успех",
                        detail: detailMessage,
                    });

                    setFile(null);
                },
                onError: (error: any) => {
                    toast?.({
                        severity: "error",
                        summary: "Ошибка",
                        detail: error?.message || "Ошибка загрузки файла",
                    });
                },
            });
        }
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
