import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/картинк на раздел ФЦ.jpg";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в фитнес клубах" }];

    return (
        <PageLayout
            title="Реклама в фитнес-клубах СПБ | Размещение в спортивных залах"
            description="Эффективная реклама в фитнес-клубах: лайтбоксы, видеомониторы, стикеры. Целевая аудитория - активные люди 18-45 лет. Гибкие условия размещения!"
        >
            <BreadCrumb model={items} />
            <BuildingPage
                sect={filterSect}
                listCategory={filterByStatus(cat)}
                port={filterByStatus(port) || []}
                alt="FITNESS"
                src={Build}
                url={Routes.POSTERFITNES}
                title="Реклама в фитнес клубах"
                description="Спорт — это привычка, а привычки формируют выбор. Реклама в фитнес центрах идеально работает: она появляется перед глазами аудитории, которая стремится к изменениям и готова действовать.
"
            />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
    const resPort = await axios<GetPortfolioSectionDto[]>(`${API_BASE}/section/portfolio/4`);
    const resSect = await axios<GetSectionDto[]>(`${API_BASE}/section`);

    const sect = resSect.data;
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`, {
        params: { sectionId: sect.filter((el) => el.number === 4)[0].id.toString() },
    });

    const port = resPort.data;
    const cat = resCat.data;
    const filterSect = sect.filter((el) => el.number === 4)[0];

    return {
        props: {
            port,
            cat,
            filterSect,
        },
    };
};
