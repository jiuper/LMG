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
import Build from "@/shared/assests/posterpvz.png";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама для ПВЗ" }];
    const listChooseEtc = [
        {
            title: "Реклама на стойках выдачи",
            description: "Эффективное размещение в зоне выдачи товаров.",
            image: img_1.src,
        },
        {
            title: "Реклама на упаковке",
            description: "Привлекайте внимание клиентов через брендированную упаковку.",
            image: img_2.src,
        },
        {
            title: "Реклама на чеках",
            description: "Дополнительное внимание клиентов с каждой покупкой.",
            image: img_3.src,
        },
        {
            title: "Реклама в зоне ожидания",
            description: "Привлеките клиентов в моменты ожидания заказов.",
            image: img_4.src,
        },
        {
            title: "Реклама через печатные материалы",
            description: "Размещение буклетов и листовок в ПВЗ.",
            image: img_5.src,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={listChooseEtc}
                alt="posterpvz"
                category="ПВЗ"
                src={Build}
                port={port || []}
                title="Реклама для ПВЗ: Как привлечь клиентов?"
                description="Привлекайте аудиторию прямо на месте выдачи.Эффективное решение для продвижения услуг и товаров среди ваших клиентов в пункте выдачи заказов."
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
