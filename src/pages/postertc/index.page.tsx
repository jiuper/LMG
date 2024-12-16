import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/postertrc.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в торговых центрах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={cat}
                sect={filterSect}
                port={port || []}
                alt="TC"
                src={Build}
                url={Routes.POSTERTC}
                title="Реклама в торговых центрах"
                description="Охватывайте клиентов в популярной локации для покупок.
                    Эффективное решение для продвижения ваших услуг и товаров среди посетителей торговых центров."
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioSectionDto[]>(`${API_BASE}/section/portfolio/3`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);
    const sect = resSect.data;
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: sect.filter((el) => el.number === 3)[0].id.toString() },
    });

    const port = resPort.data;
    const cat = resCat.data;
    const filterSect = sect.filter((el) => el.number === 3)[0];

    return {
        props: {
            port,
            cat,
            filterSect,
        },
    };
};
