import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { BuildingPage } from "@/view/Building/Building";

export default function Building() {
    const items = [{ label: "Реклама в жилых домах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage />
        </PageLayout>
    );
}
