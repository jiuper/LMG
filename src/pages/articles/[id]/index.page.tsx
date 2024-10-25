import type { GetStaticPropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Articel } from "@/view/Articel";
import { CalArticle } from "@/view/CalArticle";

type Props = { id: string };
export default function IndexPage({ id }: Props) {
    const items = [
        { label: "Статья", url: "/articles" },
        {
            label:
                id !== "9asd23crecsw123"
                    ? "Реклама для ПВЗ: Увеличьте Присутствие Вашего Бренда в Местах Получения Заказов"
                    : "Закон о рекламе: Основные положения и правила",
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            {id === "9asd23crecsw123" ? <CalArticle /> : <Articel />}
        </PageLayout>
    );
}

export const getStaticPaths = () => {
    const products = ["1", "9asd23crecsw123"];

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
