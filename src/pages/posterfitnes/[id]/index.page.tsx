import axios from "axios";
import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { filterCategoriesFitness } from "@/pages/posterfitnes/const";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { LiftMedia } from "@/view/LiftMedia";

export default function LiftMediaPage({ port, id }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [
        { label: "Реклама в фитнес клубах", url: Routes.POSTERFITNES },
        { label: filterCategoriesFitness[+id] },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LiftMedia
                caption={filterCategoriesFitness[+id]}
                description="Эффективная реклама в лифтах по всему Санкт-Петербургу и области"
                port={port}
            />
        </PageLayout>
    );
}

export const getStaticPaths = () => {
    const categories = Array(filterCategoriesFitness.length)
        .fill(0)
        .map((_, i) => i.toString());

    return {
        paths: categories.map((category) => {
            return {
                params: { id: category },
            };
        }),
        fallback: false,
    };
};
export const getStaticProps = (async (ctx: GetStaticPropsContext) => {
    const id = ctx?.params?.id as string;
    const resPort = await axios<CreateNewsDto[]>(`${API_BASE}/portfolio`);

    const port = resPort.data;

    return {
        props: {
            port,
            id,
        },
    };
}) satisfies GetStaticProps<{ port: GetPortfolioDto[]; id: string }>;
