import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import type { CreateNewsDto, GetFeedbackDto, GetPortfolioDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { Main } from "@/view";

export default function Home({ articles, news, port, feedback }: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Main articles={articles} news={news} feedback={feedback} port={port} />;
}
export const getStaticProps = (async () => {
    const resPromotion = await axios<CreateNewsDto[]>(`${API_BASE}/article`);
    const resNews = await axios<CreateNewsDto[]>(`${API_BASE}/news`);
    const resPort = await axios<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
    const resFeed = await axios<GetFeedbackDto[]>(`${API_BASE}/feedback`);
    const articles = resPromotion.data;
    const news = resNews.data;
    const port = resPort.data;
    const feedback = resFeed.data;

    return {
        props: {
            articles,
            news,
            port,
            feedback,
        },
    };
}) satisfies GetStaticProps<{
    articles: CreateNewsDto[];
    news: CreateNewsDto[];
    port: GetPortfolioDto[];
    feedback: GetFeedbackDto[];
}>;
