import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/build.png";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в жилых домах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={cat}
                sect={filterSect}
                port={port || []}
                alt="Build"
                src={Build}
                title="Реклама в жилых домах"
                description="Достигайте своей аудитории там, где она живет.Эффективное решение для продвижения ваших услуг и товаров среди жителей."
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioSectionDto[]>(`${API_BASE}/section/portfolio/1`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);
    const sect = resSect.data;
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: sect.filter((el) => el.number === 1)[0].id.toString() },
    });

    const filterSect = sect.filter((el) => el.number === 1)[0];
    const port = resPort.data;
    const cat = resCat.data;

    return {
        props: {
            port,
            cat,
            filterSect,
        },
    };
};
