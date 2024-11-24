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
import Build from "@/shared/assests/postertrc.png";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама в торговых центрах" }];
    const listChooseEtc = [
        {
            title: "Реклама на фудкортах",
            description: "Эффективное привлечение аудитории в местах отдыха.",
            image: img_1.src,
        },
        {
            title: "Реклама на входах и выходах",
            description: "Охватывайте всех посетителей, проходящих через главный вход.",
            image: img_2.src,
        },
        {
            title: "Реклама на информационных стойках",
            description: "Дополнительное внимание с каждого запроса посетителей.",
            image: img_3.src,
        },
        {
            title: "Реклама на видео экранах",
            description: "Привлекайте внимание до или после посещения ТЦ.",
            image: img_4.src,
        },
        {
            title: "Реклама на эскалаторах и лифтах",
            description: "Эффективное размещение для большого охвата.",
            image: img_5.src,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={listChooseEtc}
                port={port}
                alt="postertrc"
                category="Торговые центры"
                src={Build}
                title="Реклама в торговых центрах"
                description="Охватывайте клиентов в популярной локации для покупок.Эффективное решение для продвижения ваших услуг и товаров среди посетителей торговых центров."
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
