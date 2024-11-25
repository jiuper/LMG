import axios from "axios";
import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryAreaDto, GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { LiftMedia } from "@/view/LiftMedia";

export default function LiftMediaPage({ port, id, cat, area }: InferGetStaticPropsType<typeof getStaticProps>) {
    const filter = cat.filter((el) => el.id === id)[0];
    const items = [{ label: "Реклама для ПВЗ", url: Routes.POSTERPVZ }, { label: filter.title }];
    const filterCategory = cat.map((el) => el.title);
    const filterPort = port.filter((el) => el.categoryId === filter.id);

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LiftMedia url={`${Routes.POSTERPVZ}/${id}`} data={filter} port={filterPort} districts={area} />
        </PageLayout>
    );
}

export const getStaticPaths = async () => {
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`);
    const categories = resCat.data;

    return {
        paths: categories.map((category) => {
            return {
                params: { id: category.id },
            };
        }),
        fallback: false,
    };
};
export const getStaticProps = (async (ctx: GetStaticPropsContext) => {
    const id = ctx?.params?.id as string;
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`);
    const resArea = await axios<GetCategoryAreaDto[]>(`${API_BASE}/category-area`, { params: { categoryId: id } });

    const cat = resCat.data;
    const port = resPort.data;
    const area = resArea.data;

    return {
        props: {
            port,
            id,
            cat,
            area,
        },
    };
}) satisfies GetStaticProps<{ port: GetPortfolioDto[]; id: string; cat: GetCategoryDto[]; area: GetCategoryAreaDto[] }>;
