import axios from "axios";
import type { GetStaticPropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { Articel } from "@/view/Articel";
import { CalArticle } from "@/view/CalArticle";

type Props = { articleView: CreateNewsDto };
export default function IndexPage({ articleView }: Props) {
    const items = [
        { label: "Статья", url: "/articles" },
        {
            label: articleView.id !== "9asd23crecsw123" ? articleView.title : "Закон о рекламе",
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            {articleView.id === "9asd23crecsw123" ? <CalArticle /> : <Articel date={articleView} />}
        </PageLayout>
    );
}

export const getStaticPaths = async () => {
    const res = await axios<CreateNewsDto[]>(`${API_BASE}/article`);
    const products = res.data;
    const updatedProducts = [...products, { id: "9asd23crecsw123" }];

    return {
        paths: updatedProducts.map((product) => {
            return {
                params: { id: product.id },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    const id = ctx?.params?.id as string;
    const resNew = await axios<CreateNewsDto>(`${API_BASE}/article/${id}`);
    const newView = resNew.data;
    const upId = id === "9asd23crecsw123" ? ({ id: "9asd23crecsw123" } as CreateNewsDto) : newView;

    return {
        props: {
            articleView: upId,
        },
    };
};
