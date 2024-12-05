import axios from "axios";
import type { InferGetServerSidePropsType } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto, GetCategoryDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { PortfolioPage } from "@/view/Portfolio";

export default function Portfolio({ port, categoryList }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const items = [{ label: "Портфолио" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <PortfolioPage categoryList={categoryList} port={port || []} />
        </PageLayout>
    );
}
export const getServerSideProps = async () => {
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
};
