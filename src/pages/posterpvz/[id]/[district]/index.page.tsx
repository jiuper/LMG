import type { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { filterCategoriesPVZ } from "@/pages/posterpvz/const";
import { Routes } from "@/shared/constants";
import { LiftMediaSection } from "@/view/LiftMediaSection";

export default function IndexPage({ district, id }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [
        { label: "Реклама для ПВЗ", url: Routes.POSTERPVZ },
        { label: filterCategoriesPVZ[+id], url: `${Routes.POSTERPVZ}/${id}` },
        { label: ` ${filterCategoriesPVZ[+id]} район` },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LiftMediaSection />
        </PageLayout>
    );
}

export const getStaticPaths = () => {
    const ids = Array(filterCategoriesPVZ.length)
        .fill(0)
        .map((_, i) => i.toString());
    const districts = ["0", "1", "2", "3", "4", "5", "6", "7"];
    const combinedArray = districts.flatMap((district) => ids.map((id) => ({ district, id })));

    return {
        paths: combinedArray.map((item) => {
            return { params: { district: item.district, id: item.id } };
        }),
        fallback: false,
    };
};
export const getStaticProps = ((ctx: GetStaticPropsContext) => {
    const district = ctx?.params?.district as string;
    const id = ctx?.params?.id as string;

    return {
        props: {
            district,
            id,
        },
    };
}) satisfies GetStaticProps<{ district: string; id: string }>;
