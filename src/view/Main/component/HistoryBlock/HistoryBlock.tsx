import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import card_1 from "@/shared/assests/history_1.png";
import card_2 from "@/shared/assests/history_2.png";
import card_3 from "@/shared/assests/team/общее_фото.jpeg";
import { Routes } from "@/shared/constants";
import { HistoryCard } from "@/view/Main/component/HistoryBlock/component/HistoryCard";

import styles from "./HistoryBlock.module.scss";

const cx = cnBind.bind(styles);
export const HistoryBlock = ({ className }: { className?: string }) => {
    const href = useRouter();
    const handleDownload = async (filename: string) => {
        try {
            const response = await fetch(filename);

            if (!response.ok) {
                console.error("File download failed with status:", response.status);

                return;
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("File download failed:", error);
        }
    };
    const list = [
        { title: "История компании", image: card_1.src },
        {
            title: "Документы",
            image: card_2.src,
            listHref: [
                {
                    title: "Договор общий ИП",
                    href: "",
                    typeOnClick: () => handleDownload("/Договор_общий_ИП_ред.19.11.2024.doc"),
                },
                {
                    title: "Договор общий ООО",
                    href: "",
                    typeOnClick: () => handleDownload("/Договор общий ООО_ред.19.11.2024.doc"),
                },
                {
                    title: "Договор общий физ.лицо",
                    href: "",
                    typeOnClick: () => handleDownload("/Договор общий физ.лицо_ред.19.11.2024.doc"),
                },
            ],
        },
    ];

    return (
        <div className={cx("history-block", className)}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("cards")}>
                    <div className={cx("cards-wrapper")}>
                        {list.map((item, index) => (
                            <HistoryCard
                                type={!!item.listHref?.length}
                                onClick={() => href.push(Routes.HISTORY)}
                                key={index}
                                {...item}
                            />
                        ))}
                    </div>
                    <HistoryCard
                        onClick={() => href.push(`${Routes.HISTORY}#team`)}
                        title="Наша команда"
                        image={card_3.src}
                    />
                </div>
            </div>
        </div>
    );
};
