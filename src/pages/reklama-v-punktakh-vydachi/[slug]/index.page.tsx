import axios from "axios";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryAreaDto, GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { LiftMedia } from "@/view/LiftMedia";

export default function LiftMediaPage({
    port,
    id,
    cat,
    area,
    slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const filter = cat.filter((el) => el.id === id)[0];
    const items = [{ label: "Реклама для ПВЗ", url: Routes.POSTERPVZ }, { label: filter.title }];
    const filterPort = port.filter((el) => el.categoryId === filter.id);

    return (
        <PageLayout title={filter.seoTitle} description={filter.seoDescription}>
            <BreadCrumb model={items} />
            <LiftMedia
                url={`${Routes.POSTERPVZ}/${slug}`}
                urlGeneral={`${Routes.POSTERPVZ}`}
                data={filter}
                port={filterByStatus(filterPort)}
                districts={filterByStatus(area)}
            />
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { slug } = ctx.params as { slug: string };

    const resCat = await axios.get<GetCategoryDto[]>(`${API_BASE}/category`);
    const category = resCat.data.find((el) => el?.urlTitle === slug);

    if (!category) return { notFound: true };

    const { id } = category;

    const resPort = await axios.get<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resArea = await axios.get<GetCategoryAreaDto[]>(`${API_BASE}/category-area`, {
        params: { categoryId: id },
    });

    return {
        props: {
            id,
            slug,
            cat: resCat.data,
            port: resPort.data,
            area: resArea.data,
        },
    };
};
