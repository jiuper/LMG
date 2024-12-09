import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/posterfitnes.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, sect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в фитнес клубах" }];
    const filterCategory = cat.map((el) => el.title);
    const filterPort = port.filter((el) => filterCategory.includes(el.categoryId || ""));
    const filterSect = sect.filter((el) => el.id === "d92cfb8d-9f40-409e-be82-4e0ba9b850ed")[0];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                sect={filterSect}
                listCategory={cat}
                port={filterPort || []}
                alt="FITNESS"
                src={Build}
                url={Routes.POSTERFITNES}
                title="Реклама в фитнес клубах"
                description="Достигайте клиентов в момент их наибольшей вовлеченности.
                Эффективное решение для продвижения ваших услуг и товаров среди посетителей фитнес-клубов."
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);

    const sect = resSect.data;
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: sect.filter((el) => el.number === 4)[0].id.toString() },
    });

    const port = resPort.data;
    const cat = resCat.data;

    return {
        props: {
            port,
            cat,
            sect,
        },
    };
};
