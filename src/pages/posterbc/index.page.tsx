import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/posterbc.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, sect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в бизнес центрах" }];
    const filterCategory = cat.map((el) => el.title);
    const filterPort = port.filter((el) => filterCategory.includes(el.categoryId || ""));
    const filterSect = sect.filter((el) => el.id === "f49cb4d9-7472-495a-997b-0e3142ad1411")[0];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                sect={filterSect}
                listCategory={cat}
                port={filterPort || []}
                alt="BC"
                src={Build}
                url={Routes.POSTERBC}
                title="Реклама в бизнес центрах"
                description="Достигайте профессионалов на рабочем месте.
                    Эффективное решение для продвижения ваших услуг и товаров среди сотрудников бизнес-центров."
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);

    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: "f49cb4d9-7472-495a-997b-0e3142ad1411" },
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
