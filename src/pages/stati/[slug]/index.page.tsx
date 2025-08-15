import axios from "axios";
import type { GetServerSidePropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { Articel } from "@/view/Articel";
import { CalArticle } from "@/view/CalArticle";

type Props = { articleView: CreateNewsDto[]; slug: string };
export default function IndexPage({ articleView, slug }: Props) {
    const article = articleView.find((e) => e.urlTitle === slug);
    const items = [
        { label: "Статья", url: Routes.ARTICLES },
        {
            label: article?.id !== "9asd23crecsw123" ? article?.title : "Закон о рекламе",
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            {article?.id === "9asd23crecsw123" ? <CalArticle /> : <Articel date={article} />}
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { slug } = ctx.query as { slug: string; id: string };

    try {
        const resNew = await axios.get<CreateNewsDto[]>(`${API_BASE}/article`);

        return { props: { articleView: resNew.data, slug } };
    } catch (error) {
        return { notFound: true };
    }
};
