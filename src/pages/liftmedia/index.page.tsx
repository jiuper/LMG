import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { LiftMedia } from "@/view/LiftMedia";

export default function LiftMediaPage() {
    const items = [{ label: "Реклама лифтах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <LiftMedia />
        </PageLayout>
    );
}
