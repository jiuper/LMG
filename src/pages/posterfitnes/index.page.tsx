import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import img_1 from "@/shared/assests/choose/Image (3).png";
import img_2 from "@/shared/assests/choose/Image (4).png";
import img_3 from "@/shared/assests/choose/Image (5).png";
import img_4 from "@/shared/assests/choose/Image (6).png";
import img_5 from "@/shared/assests/choose/Image (7).png";
import Build from "@/shared/assests/posterfitnes.png";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама в фитнес клубах" }];
    const listChooseEtc = [
        {
            title: "Реклама на тренажерах",
            description: "Эффективное размещение в местах повышенного интереса.",
            image: img_1.src,
        },
        {
            title: "Реклама в раздевалках",
            description: "Привлекайте внимание посетителей в персональных зонах.",
            image: img_2.src,
        },
        {
            title: "Реклама на видеоэкранах",
            description: "Привлекайте внимание динамичными визуальными роликами.",
            image: img_3.src,
        },
        {
            title: "Реклама на зеркалах",
            description: "Дополнительное внимание в зонах с высоким трафиком.",
            image: img_4.src,
        },
        {
            title: "Реклама на полотенцах или бутылках воды",
            description: "Долгосрочная реклама, использующая аксессуары фитнес-клуба.",
            image: img_5.src,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={listChooseEtc}
                alt="posterfitnes"
                src={Build}
                category="Фитнес центры"
                port={port || []}
                title="Реклама в фитнес клубах"
                description="Достигайте клиентов в момент их наибольшей вовлеченности. Эффективное решение для продвижения ваших услуг и товаров среди посетителей фитнес-клубов."
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
