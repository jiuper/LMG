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
    slug,
    area,
    build,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const filterCat = cat.filter((el) => el.id === id)[0];
    const filterArea = area.filter((el) => el?.urlTitle === district)[0];
    const items = [
        { label: "Реклама в жилых домах", url: Routes.BUILDING },
        { label: filterCat.title, url: `${Routes.BUILDING}/${slug}` },
        { label: `${filterArea?.area?.name} район` },
    ];

    return (
        <PageLayout title={filterArea?.seoTitle} description={filterArea?.seoDescription}>
            <BreadCrumb model={items} />
            <LiftMediaSection
                title={filterCat?.title}
                url={`${Routes.BUILDING}/${slug}/${district}`}
                units={filterByStatus(build)}
                district={filterArea}
            />
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { slug, district } = ctx.params as { slug: string; district: string };

    const resCat = await axios.get<GetCategoryDto[]>(`${API_BASE}/category`);
    const cat = resCat.data;

    const matchedCategory = cat.find((c) => c?.urlTitle === slug);

    if (!matchedCategory) return { notFound: true };

    const { id } = matchedCategory;

    const resArea = await axios.get<GetCategoryAreaDto[]>(`${API_BASE}/category-area`, {
        params: { categoryId: id },
    });

    const area = resArea.data;

    const matchedArea = area.find((a) => a?.urlTitle === district);

    if (!matchedArea) return { notFound: true };

    const categoryAreaId = matchedArea.id;

    const resBuild = await axios.get<GetBuildDto[]>(`${API_BASE}/build`, {
        params: { categoryAreaId },
    });

    return {
        props: {
            district,
            id,
            slug,
            cat,
            area,
            build: resBuild.data,
        },
    };
};
