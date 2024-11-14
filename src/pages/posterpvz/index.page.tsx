import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { BuildingPage } from "@/view/Building/Building";

export default function Building({ port }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Реклама для ПВЗ: Как привлечь клиентов?" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                port={port || []}
                title="Реклама для ПВЗ: Как привлечь клиентов?"
                description="Привлекайте аудиторию прямо на месте выдачи.Эффективное решение для продвижения услуг и товаров среди ваших клиентов в пункте выдачи заказов."
            />
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
