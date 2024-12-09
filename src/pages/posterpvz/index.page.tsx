import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/posterpvz.png";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function IndexPage({ port, cat, sect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама для ПВЗ" }];
    const filterCategory = cat.map((el) => el.title);
    const filterPort = port.filter((el) => filterCategory.includes(el.categoryId || ""));
    const filterSect = sect.filter((el) => el.id === "b2d9bcfb-211a-4103-ba93-56eed386da97")[0];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                sect={filterSect}
                listCategory={cat}
                port={filterPort || []}
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
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);

    const sect = resSect.data;
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: sect.filter((el) => el.number === 5)[0].id.toString() },
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
