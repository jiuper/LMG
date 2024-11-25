import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/posterbc.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама в бизнес центрах" }];
    const filterCategory = cat.map((el) => el.title);
    const filterPort = port.filter((el) => filterCategory.includes(el.categoryId || ""));

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
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
export const getStaticProps = (async () => {
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: "f49cb4d9-7472-495a-997b-0e3142ad1411" },
    });

    const port = resPort.data;
    const cat = resCat.data;

    return {
        props: {
            port,
            cat,
        },
    };
}) satisfies GetStaticProps<{ port: GetPortfolioDto[]; cat: GetCategoryDto[] }>;
