import axios from "axios";
import type { GetServerSidePropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { Articel } from "@/view/Articel";

type Props = { newView: CreateNewsDto };
export default function IndexPage({ newView }: Props) {
    const items = [
        { label: "Новости", url: "/news" },
        {
            label: newView.title,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Articel date={newView} />
        </PageLayout>
    );
}

export const getStaticPaths = async () => {
    const res = await axios<CreateNewsDto[]>(`${API_BASE}/news`);

    const products = res.data;

    return {
        paths: products.map((product) => {
            return {
                params: { id: product.id },
            };
        }),
        fallback: false,
    };
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const id = ctx?.params?.id as string;
    const resNew = await axios<CreateNewsDto>(`${API_BASE}/news/${id}`);
    const newView = resNew.data;

    return {
        props: {
            newView,
        },
    };
};
