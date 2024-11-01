import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { BuildingPage } from "@/view/Building/Building";

export default function Building() {
    const items = [{ label: "Реклама в бизнес центрах" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <BuildingPage
                title="Реклама в бизнес центрах"
                description="Достигайте профессионалов на рабочем месте.Эффективное решение для продвижения ваших услуг и товаров среди сотрудников бизнес-центров."
            />
        </PageLayout>
    );
}
