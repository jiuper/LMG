import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { BuildingPage } from "@/view/Building/Building";

export default function Building() {
    const items = [{ label: "Реклама для ПВЗ: Как привлечь клиентов?" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                title="Реклама для ПВЗ: Как привлечь клиентов?"
                description="Привлекайте аудиторию прямо на месте выдачи.Эффективное решение для продвижения услуг и товаров среди ваших клиентов в пункте выдачи заказов."
            />
        </PageLayout>
    );
}
