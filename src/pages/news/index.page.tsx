import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Articles } from "@/view/Articles";

type Props = {};
export default function News() {
    const items = [{ label: "Новости" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Articles title="Новости" />
        </PageLayout>
    );
}
