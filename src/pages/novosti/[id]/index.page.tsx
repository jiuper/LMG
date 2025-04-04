import axios from "axios";
import type { GetServerSidePropsContext } from "next";

import { BreadCrumb } from "@/components/BreadCrumb";
import type { CreateNewsDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { API_BASE } from "@/shared/constants/private";
import { Articel } from "@/view/Articel";

type Props = { newView: CreateNewsDto };
export default function IndexPage({ newView }: Props) {
    const items = [
        { label: "Новости", url: "/news" },
        {
            label: newView.title,
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Articel date={newView} />
        </PageLayout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const id = ctx?.params?.id as string;
    const resNew = await axios.get<CreateNewsDto>(`${API_BASE}/news/${id}`);
    const newView = resNew.data;

    return { props: { newView } };
};
