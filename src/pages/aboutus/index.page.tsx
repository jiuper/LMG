import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { AboutUsPage } from "@/view/AboutUs";

export default function AboutUs() {
    const items = [{ label: "О нас" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <AboutUsPage />
        </PageLayout>
    );
}
