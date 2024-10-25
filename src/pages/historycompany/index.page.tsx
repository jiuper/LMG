import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { HistoryCompanyPage } from "@/view/HistoryCompany";

export default function HistoryCompany() {
    const items = [{ label: "О нас", url: "/aboutus" }, { label: "История компании" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <HistoryCompanyPage />
        </PageLayout>
    );
}
