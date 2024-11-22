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
import Build from "@/shared/assests/posterbc.png";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама в бизнес центрах" }];
    const listChooseEtc = [
        {
            title: "Реклама на ресепшн",
            description: "Эффективное размещение в зоне регистрации посетителей",
            image: img_1.src,
        },
        {
            title: "Реклама в лифтах",
            description: "Привлекайте внимание сотрудников и гостей.",
            image: img_2.src,
        },
        {
            title: "Реклама на доске объявлений",
            description: "Дополнительное внимание через печатные материалы.",
            image: img_3.src,
        },
        {
            title: "Реклама на экранах в зонах отдыха",
            description: "Охват аудитории во время перерывов и встреч.",
            image: img_4.src,
        },
        {
            title: "Реклама на дверях офисов",
            description: "Долгосрочная реклама, интегрированная в среду работы.",
            image: img_5.src,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={listChooseEtc}
                alt="posterbc"
                src={Build}
                category="Бизнес-центры"
                port={port || []}
                title="Реклама в бизнес центрах"
                description="Достигайте профессионалов на рабочем месте.Эффективное решение для продвижения ваших услуг и товаров среди сотрудников бизнес-центров."
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
