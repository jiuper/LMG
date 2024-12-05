import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/build.png";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, sect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в жилых домах" }];
    const filterCategory = cat.map((el) => el.title);
    const filterPort = port.filter((el) => filterCategory.includes(el.categoryId || ""));
    const filterSect = sect.filter((el) => el.id === "7ce310e7-e872-4e04-bbff-62df310a5cf9")[0];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={cat}
                sect={filterSect}
                port={filterPort || []}
                alt="Build"
                src={Build}
                title="Реклама в жилых домах"
                description="Достигайте своей аудитории там, где она живет.Эффективное решение для продвижения ваших услуг и товаров среди жителей."
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: "7ce310e7-e872-4e04-bbff-62df310a5cf9" },
    });

    const port = resPort.data;
    const cat = resCat.data;
    const sect = resSect.data;

    return {
        props: {
            port,
            cat,
            sect,
        },
    };
};
