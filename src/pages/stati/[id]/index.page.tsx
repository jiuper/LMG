import axios from "axios";
import type { GetServerSidePropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { Articel } from "@/view/Articel";
import { CalArticle } from "@/view/CalArticle";

type Props = { articleView: CreateNewsDto };
export default function IndexPage({ articleView }: Props) {
    const items = [
        { label: "Статья", url: Routes.ARTICLES },
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const id = ctx?.params?.id as string;
    const resNew = await axios.get<CreateNewsDto>(`${API_BASE}/article/${id}`);
    const newView = resNew.data;
    const upId = id === "9asd23crecsw123" ? ({ id: "9asd23crecsw123" } as CreateNewsDto) : newView;

    return { props: { articleView: upId } };
};
