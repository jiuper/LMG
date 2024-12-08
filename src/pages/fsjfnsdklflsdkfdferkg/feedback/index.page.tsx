import { PageLayout } from "@/layouts/PageLayout";
import { AdminEntityPage } from "@/view/AdminPage/AdminEntityPageC";
import { AdminEntityPageType } from "@/view/AdminPage/types";

export default function FeedbackPage() {
    return (
        <PageLayout>
            <AdminEntityPage entityType={AdminEntityPageType.FEEDBACK} />
        </PageLayout>
    );
}
