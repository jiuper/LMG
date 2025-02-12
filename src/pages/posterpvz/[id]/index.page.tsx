import axios from "axios";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { GetCategoryAreaDto, GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { LiftMedia } from "@/view/LiftMedia";

export default function LiftMediaPage({ port, id, cat, area }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const filter = cat.filter((el) => el.id === id)[0];
    const items = [{ label: "Реклама для ПВЗ", url: Routes.POSTERPVZ }, { label: filter.title }];
    const filterPort = port.filter((el) => el.categoryId === filter.id);

    return (
        <PageLayout title={filter.seoTitle} description={filter.seoDescription}>
            <BreadCrumb model={items} />
            <LiftMedia
                url={`${Routes.POSTERPVZ}/${id}`}
                data={filter}
                port={filterByStatus(filterPort)}
                districts={area}
            />
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
};
