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
    build,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const filterCat = cat.filter((el) => el.id === id)[0];
    const filterArea = area.filter((el) => el.id === district)[0];
    const filterBuild = build.filter((el) => el.id === entity)[0];
    const items = [
        { label: "Реклама для ПВЗ", url: Routes.POSTERPVZ },
        { label: filterCat.title, url: `${Routes.POSTERPVZ}/${id}` },
        { label: `${filterArea.area.name} район`, url: `${Routes.POSTERPVZ}/${id}/${district}` },
        { label: ` ${filterBuild.name} юнит` },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LeftMediaJk units={filterBuild} />
        </PageLayout>
    );
}

export const getStaticPaths = async () => {
    const resCat = await axios<GetCategoryAreaDto[]>(`${API_BASE}/category-area`);
    const resBuild = await axios<GetBuildDto[]>(`${API_BASE}/build`);

    const cat = resCat.data;
    const build = resBuild.data;

    const combinedArray = cat.flatMap((district) =>
        build.map((entity) => ({
            district,
            entity,
        })),
    );

    return {
        paths: combinedArray.map((item) => ({
            params: {
                district: item.district.id,
                id: item.district.categoryId,
                entity: item.entity.id,
            },
        })),
        fallback: false,
    };
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const district = ctx?.params?.district as string;
    const id = ctx?.params?.id as string;
    const entity = ctx?.params?.entity as string;

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
            entity,
            cat,
            area,
            build,
        },
    };
};
