import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/postertrc.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, sect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в торговых центрах" }];
    const filterCategory = cat.map((el) => el.title);
    const filterPort = port.filter((el) => filterCategory.includes(el.categoryId || ""));
    const filterSect = sect.filter((el) => el.id === "5bac48d6-281e-4408-ab8a-418e7ce45907")[0];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={cat}
                sect={filterSect}
                port={filterPort || []}
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
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: "5bac48d6-281e-4408-ab8a-418e7ce45907" },
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
