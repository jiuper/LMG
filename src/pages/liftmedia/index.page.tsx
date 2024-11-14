import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { LiftMedia } from "@/view/LiftMedia";

export default function LiftMediaPage({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама лифтах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LiftMedia port={port} />
        </PageLayout>
    );
}
export const getStaticProps = (async () => {
    const resPort = await axios<CreateNewsDto[]>(`${API_BASE}/portfolio`);

    const port = resPort.data;

    return {
        props: {
            port,
        },
    };
}) satisfies GetStaticProps<{ port: GetPortfolioDto[] }>;
