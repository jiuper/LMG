import axios from "axios";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetBuildDto, GetCategoryAreaDto, GetCategoryDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { LeftMediaJk } from "@/view/LeftMediaJK";

export default function IndexPage({
    district,
    id,
    entity,
    cat,
    area,
    slug,
    build,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const filterCat = cat.filter((el) => el.id === id)[0];
    const filterArea = area.filter((el) => el.urlTitle === district)[0];
    const filterBuild = build.filter((el) => el.urlTitle === entity)[0];
    const items = [
        { label: "Реклама в торговых центрах", url: Routes.POSTERTC },
        { label: filterCat.title, url: `${Routes.POSTERTC}/${slug}` },
        { label: `${filterArea.area.name} район`, url: `${Routes.POSTERTC}/${slug}/${district}` },
        { label: ` ${filterBuild.name} юнит` },
    ];

    return (
        <PageLayout title={filterBuild.seoTitle} description={filterBuild.seoDescription}>
            <BreadCrumb model={items} />
            <LeftMediaJk units={filterBuild} />
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { slug, district, entity } = ctx.params as {
        slug: string;
        district: string;
        entity: string;
    };

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

    const resBuild = await axios.get<GetBuildDto[]>(`${API_BASE}/build`, {
        params: { categoryAreaId: matchedArea.id },
    });

    const build = resBuild.data;

    return {
        props: {
            district,
            id,
            entity,
            cat,
            area,
            build,
            slug,
        },
    };
};
