import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import type { GetCategoryListApiRawResponse } from "@/api/getCategoryListApi/types";
import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { PortfolioPage } from "@/view/Portfolio";

export default function Portfolio({ port, categoryList }: InferGetStaticPropsType<typeof getStaticProps>) {
    const items = [{ label: "Портфолио" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <PortfolioPage categoryList={categoryList} port={port || []} />
        </PageLayout>
    );
}
export const getStaticProps = (async () => {
    const resPort = await axios<CreateNewsDto[]>(`${API_BASE}/portfolio`);
    const resCat = await axios<GetCategoryDto[]>(`${API_BASE}/category`);

    const port = resPort.data;

    const categoryList = resCat.data;

    return {
        props: {
            port,
            categoryList,
        },
    };
}) satisfies GetStaticProps<{ port: GetPortfolioDto[]; categoryList: GetCategoryListApiRawResponse }>;
