import type { GetStaticPropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { LeftMediaJk } from "@/view/LeftMediaJK";

export default function IndexPage() {
    const items = [
        { label: "Реклама лифтах", url: "/liftmedia" },
        { label: "Реклама лифтах проспект", url: `/liftmedia/${1}` },
        { label: "ЖК Солнышко" },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LeftMediaJk />
        </PageLayout>
    );
}

export const getStaticPaths = () => {
    const products = ["1"];

    return {
        paths: products.map((product) => {
            return {
                params: { id: product, card: product },
            };
        }),
        fallback: false,
    };
};
export const getStaticProps = (ctx: GetStaticPropsContext) => {
    const card = ctx?.params?.card as string;

    return {
        props: {
            card,
        },
    };
};
