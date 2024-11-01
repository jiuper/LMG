import type { GetStaticPropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { LiftMediaSection } from "@/view/LiftMediaSection";

export default function IndexPage() {
    const items = [{ label: "Реклама лифтах", url: "/liftmedia" }, { label: "Реклама лифтах проспект" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LiftMediaSection />
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
