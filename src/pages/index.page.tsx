import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import type { CreateNewsDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { Main } from "@/view";

export default function Home({ articles, news }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Main articles={articles} news={news} />;
}
export const getStaticProps = (async () => {
    const resPromotion = await axios<CreateNewsDto[]>(`${API_BASE}/article`);
    const resNews = await axios<CreateNewsDto[]>(`${API_BASE}/news`);
    const articles = resPromotion.data;
    const news = resNews.data;

    return {
        props: {
            articles,
            news,
        },
    };
}) satisfies GetStaticProps<{ articles: CreateNewsDto[]; news: CreateNewsDto[] }>;
