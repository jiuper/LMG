import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { AboutUsPage } from "@/view/AboutUs";

export default function AboutUs() {
    const items = [{ label: "О нас" }];

    return (
        <PageLayout
            title="Lift Media Group – О нашем рекламном агентстве"
            description="Lift Media Group – рекламное агентство с 2010 года. Специализируемся на рекламе в лифтах, ТЦ и БЦ. Узнайте о нашей миссии и преимуществах!"
        >
            <BreadCrumb model={items} />
            <AboutUsPage />
        </PageLayout>
    );
}
