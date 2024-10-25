import type { GetStaticPropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Articel } from "@/view/Articel";

type Props = { id: string };
export default function IndexPage({ id }: Props) {
    const items = [
        { label: "Новости", url: "/news" },
        {
            label: "Реклама для ПВЗ: Увеличьте Присутствие Вашего Бренда в Местах Получения Заказов",
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Articel />
        </PageLayout>
    );
}

export const getStaticPaths = () => {
    const products = ["1"];

    return {
        paths: products.map((product) => {
            return {
                params: { id: product },
            };
        }),
        fallback: false,
    };
};
export const getStaticProps = (ctx: GetStaticPropsContext) => {
    const id = ctx?.params?.id as string;

    return {
        props: {
            id,
        },
    };
};
