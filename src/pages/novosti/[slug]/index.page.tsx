import axios from "axios";
import type { GetServerSidePropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { API_BASE } from "@/shared/constants/private";
import { Articel } from "@/view/Articel";

type Props = { newView: CreateNewsDto[]; slug: string };
export default function IndexPage({ newView, slug }: Props) {
    const news = newView.find((e) => e.urlTitle === slug);

    const items = [
        { label: "Новости", url: Routes.NEWS },
        {
            label: news?.title,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Articel date={news} />
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { slug } = ctx.query as { slug: string; id: string };

    const resNew = await axios.get<CreateNewsDto>(`${API_BASE}/news`);

    return { props: { newView: resNew.data, slug } };
};
