import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { BuildingPage } from "@/view/Building/Building";

export default function Building() {
    const items = [{ label: "Реклама в фитнес клубах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                title="Реклама в фитнес клубах"
                description="Достигайте клиентов в момент их наибольшей вовлеченности. Эффективное решение для продвижения ваших услуг и товаров среди посетителей фитнес-клубов."
            />
        </PageLayout>
    );
}
