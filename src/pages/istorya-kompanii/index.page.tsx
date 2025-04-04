import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Routes } from "@/shared/constants";
import { HistoryCompanyPage } from "@/view/HistoryCompany";

export default function HistoryCompany() {
    const items = [{ label: "О нас", url: Routes.ABOUTUS }, { label: "История компании" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <HistoryCompanyPage />
        </PageLayout>
    );
}
