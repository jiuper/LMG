import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { PortfolioPage } from "@/view/Portfolio";

export default function Portfolio() {
    const items = [{ label: "Портфолио" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <PortfolioPage />
        </PageLayout>
    );
}
