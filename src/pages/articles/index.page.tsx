import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Articles } from "@/view/Articles";

type Props = {};
export default function ArticlesPage({}: Props) {
    const items = [{ label: "Статья" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Articles />
        </PageLayout>
    );
}
