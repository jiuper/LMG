import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Politika } from "@/view/Politika";

export default function PolitikaPage() {
    const items = [{ label: "Политика конфиденциальности" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Politika />
        </PageLayout>
    );
}
