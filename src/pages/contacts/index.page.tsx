import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Contacts } from "@/view/Contacts";

export default function ContactsPage() {
    const items = [{ label: "Контакты" }];

    return (
        <PageLayout>
            <BreadCrumb model={items} />
            <Contacts />
        </PageLayout>
    );
}
