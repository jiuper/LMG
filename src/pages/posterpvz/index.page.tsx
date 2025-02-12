import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/ПВЗ картинка на раздел.jpg";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { BuildingPage } from "@/view/Building/Building";

export default function IndexPage({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама для ПВЗ" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                sect={filterSect}
                listCategory={filterByStatus(cat)}
                port={filterByStatus(port) || []}
                alt="PVZ"
                src={Build}
                url={Routes.POSTERPVZ}
                title="Реклама в пунктах выдачи заказов"
                description="Реклама в пунктах выдачи заказов - идеальный момент для привлечения внимания клиентов, когда они находятся в ожидании получения своих покупок! Не упустите шанс сделать свою рекламу частью их позитивного опыта!
"
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
