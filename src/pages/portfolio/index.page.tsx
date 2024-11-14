import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { PortfolioPage } from "@/view/Portfolio";

export default function Portfolio({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Портфолио" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <PortfolioPage port={port || []} />
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
