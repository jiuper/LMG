import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/раздел БЦ.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в бизнес центрах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                sect={filterSect}
                listCategory={cat}
                port={port || []}
                alt="BC"
                src={Build}
                url={Routes.POSTERBC}
                title="Реклама в бизнес центрах"
                description="Внимание деловой аудитории всегда на вес золота. Реклама в бизнес-центрах идеально подходит, чтобы «достучаться» до успешных и занятых людей в их профессиональной среде.
"
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioSectionDto[]>(`${API_BASE}/section/portfolio/2`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);

    const sect = resSect.data;
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: sect.filter((el) => el.number === 2)[0].id.toString() },
    });

    const port = resPort.data;
    const cat = resCat.data;
    const filterSect = sect.filter((el) => el.number === 2)[0];

    return {
        props: {
            port,
            cat,
            filterSect,
        },
    };
};
