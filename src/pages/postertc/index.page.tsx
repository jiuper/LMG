import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/Реклама в ТЦ.jpg";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в торговых центрах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={filterByStatus(cat)}
                sect={filterSect}
                port={filterByStatus(port) || []}
                alt="TC"
                src={Build}
                url={Routes.POSTERTC}
                title="Реклама в торговых центрах"
                description="Торговые центры — это места, где люди не только покупают, но и отдыхают. В макетах для рекламы в торговых центрах используйте яркие цвета и креативный подход. Кто не остановится на мгновение, увидев что-то действительно интересное?!
"
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
