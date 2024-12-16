import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/posterpvz.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function IndexPage({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама для ПВЗ" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                sect={filterSect}
                listCategory={cat}
                port={port || []}
                alt="PVZ"
                src={Build}
                url={Routes.POSTERPVZ}
                title="Реклама для ПВЗ: Как привлечь клиентов?"
                description="Привлекайте аудиторию прямо на месте выдачи.
                    Эффективное решение для продвижения услуг и товаров среди ваших клиентов в пункте выдачи заказов."
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioSectionDto[]>(`${API_BASE}/section/portfolio/5`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);

    const sect = resSect.data;
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: sect.filter((el) => el.number === 5)[0].id.toString() },
    });

    const port = resPort.data;
    const cat = resCat.data;
    const filterSect = sect.filter((el) => el.number === 5)[0];

    return {
        props: {
            port,
            cat,
            filterSect,
        },
    };
};
