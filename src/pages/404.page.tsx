import { PageLayout } from "@/layouts/PageLayout";
import { NotFound } from "@/view/NotFound";

export default function NotFoundPage() {
    return (
        <PageLayout title="Ошибка | Такой страницы не существует">
            <NotFound />
        </PageLayout>
    );
}
