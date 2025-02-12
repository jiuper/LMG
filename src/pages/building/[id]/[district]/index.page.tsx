import axios from "axios";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetBuildDto, GetCategoryAreaDto, GetCategoryDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { LiftMediaSection } from "@/view/LiftMediaSection";

export default function IndexPage({
    district,
    id,
    cat,
    area,
    build,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const filterCat = cat.filter((el) => el.id === id)[0];
    const filterArea = area.filter((el) => el.id === district)[0];
    const items = [
        { label: "Реклама в жилых домах", url: Routes.BUILDING },
        { label: filterCat.title, url: `${Routes.BUILDING}/${id}` },
        { label: `${filterArea.area.name} район` },
    ];

    return (
        <PageLayout title={filterArea.seoTitle} description={filterArea.seoDescription}>
            <BreadCrumb model={items} />
            <LiftMediaSection
                title={filterCat.title}
                url={`${Routes.BUILDING}/${id}/${district}`}
                units={filterByStatus(build)}
                district={filterArea}
            />
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const district = ctx?.params?.district as string;
    const id = ctx?.params?.id as string;

    const resArea = await axios<GetCategoryAreaDto[]>(`${API_BASE}/category-area`, { params: { categoryId: id } });
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`);
    const resBuild = await axios<GetBuildDto[]>(`${API_BASE}/build`, { params: { categoryAreaId: district } });

    const cat = resCat.data;
    const area = resArea.data;
    const build = resBuild.data;

    return {
        props: {
            district,
            id,
            cat,
            area,
            build,
        },
    };
};
