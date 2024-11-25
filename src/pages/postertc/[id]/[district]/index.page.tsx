import axios from "axios";
import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetBuildDto, GetCategoryAreaDto, GetCategoryDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { LiftMediaSection } from "@/view/LiftMediaSection";

export default function IndexPage({ district, id, cat, area, build }: InferGetStaticPropsType<typeof getStaticProps>) {
    const filterCat = cat.filter((el) => el.id === id)[0];
    const filterArea = area.filter((el) => el.id === district)[0];
    const items = [
        { label: "Реклама в торговых центрах", url: Routes.POSTERTC },
        { label: filterCat.title, url: `${Routes.POSTERTC}/${id}` },
        { label: `${filterArea.area.name} район` },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LiftMediaSection url={`${Routes.POSTERTC}/${id}/${district}`} units={build} district={filterArea} />
        </PageLayout>
    );
}

export const getStaticPaths = async () => {
    const resCat = await axios<GetCategoryAreaDto[]>(`${API_BASE}/category-area`);

    const cat = resCat.data;

    return {
        paths: cat.map((item) => {
            return { params: { district: item.id, id: item.categoryId } };
        }),
        fallback: false,
    };
};
export const getStaticProps = (async (ctx: GetStaticPropsContext) => {
    const district = ctx?.params?.district as string;
    const id = ctx?.params?.id as string;

    const resArea = await axios<GetCategoryAreaDto[]>(`${API_BASE}/category-area`, { params: { categoryId: id } });
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`);
    const resBuild = await axios<GetBuildDto[]>(`${API_BASE}/build`, { params: { areaId: district } });

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
}) satisfies GetStaticProps<{
    district: string;
    id: string;
    cat: GetCategoryDto[];
    area: GetCategoryAreaDto[];
    build: GetBuildDto[];
}>;
