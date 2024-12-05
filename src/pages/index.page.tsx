import axios from "axios";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import type { CreateNewsDto, GetFeedbackDto, GetPortfolioDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { Main } from "@/view";

export default function Home({
    articles,
    news,
    port,
    feedback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <Main articles={articles} news={news} feedback={feedback} port={port} />;
}

export const getServerSideProps: GetServerSideProps<{
    articles: CreateNewsDto[];
    news: CreateNewsDto[];
    port: GetPortfolioDto[];
    feedback: GetFeedbackDto[];
}> = async () => {
    try {
        const resPromotion = await axios.get<CreateNewsDto[]>(`${API_BASE}/article`);
        const resNews = await axios.get<CreateNewsDto[]>(`${API_BASE}/news`);
        const resPort = await axios.get<GetPortfolioDto[]>(`${API_BASE}/portfolio`);
        const resFeed = await axios.get<GetFeedbackDto[]>(`${API_BASE}/feedback`);

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
    } catch (e) {
        return {
            props: {
                articles: [],
                news: [],
                port: [],
                feedback: [],
            },
        };
    }
};
