import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryDto, GetPortfolioSectionDto, GetSectionDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import Build from "@/shared/assests/build.jpg";
import { API_BASE } from "@/shared/constants/private";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { BuildingPage } from "@/view/Building/Building";

const advertisingOptions = [
    "рекламавлифтах",
    "рекламанавидеоэкранах",
    "размещениевподъездах",
    "дорхенгеры",
    "квитанции",
    "почтовыеящики",
];

export default function Building({ port, cat, filterSect }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Реклама в жилых домах" }];
    const sortCategoriesByPriority = (categories: GetCategoryDto[], priorities: string[]) => {
        return categories.sort((a, b) => {
            const formattedTitleA = a.title.toLowerCase().replace(/\s/g, "");
            const formattedTitleB = b.title.toLowerCase().replace(/\s/g, "");
            const priorityA = priorities.indexOf(formattedTitleA);
            const priorityB = priorities.indexOf(formattedTitleB);

            if (priorityA !== -1 && priorityB !== -1) {
                return priorityA - priorityB;
            }

            if (priorityA !== -1) {
                return -1;
            }

            if (priorityB !== -1) {
                return 1;
            }

            return 0;
        });
    };
    const sortedCategories = sortCategoriesByPriority(cat, advertisingOptions);

    return (
        <PageLayout
            title="Реклама в ЖК и новостройках | Размещение в жилых домах СПб"
            description="Эффективная реклама в ЖК, новостройках и элитных жилых комплексах. Digital-экраны,стенды, дорхенгеры, вложения в квитанции в Санкт-Петербурге. Полный цикл услуг!"
        >
            <BreadCrumb model={items} />
            <BuildingPage
                listCategory={filterByStatus(sortedCategories)}
                sect={filterSect}
                port={filterByStatus(port) || []}
                alt="Build"
                src={Build}
                title="Реклама в жилых домах"
                description="Реклама в жилых домах — это возможность быть на виду у клиентов каждый
                            день! Ваше сообщение встречает жителей, когда они выходят из дома или
                            возвращаются с работы: это часть их повседневной жизни. Именно ваша
                            реклама станет тем самым «щелчком», который заставит их обратиться к вам"
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
