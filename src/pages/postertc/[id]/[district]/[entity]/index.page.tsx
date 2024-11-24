import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { filterCategoriesTC } from "@/pages/postertc/const";
import { Routes } from "@/shared/constants";
import { LeftMediaJk } from "@/view/LeftMediaJK";

export default function IndexPage({ district, id, entity }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [
        { label: "Реклама в торговых центрах", url: Routes.POSTERTC },
        { label: filterCategoriesTC[+id], url: `${Routes.POSTERTC}/${id}` },
        { label: ` ${filterCategoriesTC[+id]} район`, url: `${Routes.POSTERTC}/${id}/${district}` },
        { label: ` ${filterCategoriesTC[+id]} тц` },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LeftMediaJk />
        </PageLayout>
    );
}

export const getStaticPaths = () => {
    const ids = Array(filterCategoriesTC.length)
        .fill(0)
        .map((_, i) => i.toString());
    const districts = ["0", "1", "2", "3", "4", "5", "6", "7"];
    const entities = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const combinedArray = districts.flatMap((district) =>
        ids.flatMap((id) =>
            entities.map((entity) => ({
                district,
                id,
                entity,
            })),
        ),
    );

    return {
        paths: combinedArray.map((item) => ({
            params: {
                district: item.district,
                id: item.id,
                entity: item.entity,
            },
        })),
        fallback: false,
    };
};

export const getStaticProps = ((ctx: GetStaticPropsContext) => {
    const district = ctx?.params?.district as string;
    const id = ctx?.params?.id as string;
    const entity = ctx?.params?.entity as string;

    return {
        props: {
            district,
            id,
            entity,
        },
    };
}) satisfies GetStaticProps<{ district: string; id: string; entity: string }>;
