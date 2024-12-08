import { PageLayout } from "@/layouts/PageLayout";
import { AdminEntityPage } from "@/view/AdminPage/AdminEntityPageC";
import { AdminEntityPageType } from "@/view/AdminPage/types";

export default function PortfolioPage() {
    return (
        <PageLayout>
            <AdminEntityPage entityType={AdminEntityPageType.PORTFOLIO} />
        </PageLayout>
    );
}
