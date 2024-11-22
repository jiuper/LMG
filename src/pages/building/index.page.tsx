import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/build.png";
import img_1 from "@/shared/assests/choose/Image (3).png";
import img_2 from "@/shared/assests/choose/Image (4).png";
import img_3 from "@/shared/assests/choose/Image (5).png";
import img_4 from "@/shared/assests/choose/Image (6).png";
import img_5 from "@/shared/assests/choose/Image (7).png";
import img_6 from "@/shared/assests/choose/Image (8).png";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама в жилых домах" }];
    const listChooseEtc = [
        {
            title: "Реклама в лифтах",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_1.src,
        },
        {
            title: "Реклама в подъездах",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_2.src,
        },
        {
            title: "Распространение по почтовым ящикам",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_3.src,
        },
        {
            title: "Реклама на видео экранах",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_4.src,
        },
        {
            title: "Вложение квитанции",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_5.src,
        },
        {
            title: "Распространение дорхенгеров",
            description: "Эффективное размещение в кабинах лифтов",
            image: img_6.src,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={listChooseEtc}
                category="Жилые комплексы"
                port={port || []}
                alt="Build"
                src={Build}
                title="Реклама в жилых домах"
                description="Достигайте своей аудитории там, где она живет.Эффективное решение для продвижения ваших услуг и товаров среди жителей."
            />
        </PageLayout>
    );
}
export const getStaticProps = (async () => {
    const resPort = await axios<CreateNewsDto[]>(`${API_BASE}/portfolio`);

    const port = resPort.data;

    return {
        props: {
            port,
        },
    };
}) satisfies GetStaticProps<{ port: GetPortfolioDto[] }>;
