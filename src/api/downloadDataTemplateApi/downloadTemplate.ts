import { axiosInstance } from "@/shared/axios/axios";

interface DownloadResult {
    success: boolean;
    message: string;
}

export const templateDataDownloadApi = async (url: string, fileName: string): Promise<DownloadResult> => {
    try {
        const response = await axiosInstance.get<Blob>(url, {
            responseType: "blob",
        });

        const fileUrl = window.URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return { success: true, message: "Файл успешно скачан" };
    } catch (error: any) {
        console.error("Ошибка при скачивании файла:", error);

        let errorMessage = "Ошибка при скачивании файла.";

        if (error.response?.data instanceof Blob) {
        } else if (typeof error.response?.data === "string") {
            errorMessage = error.response.data;
        }

        return { success: false, message: errorMessage };
    }
};
