import { BreadCrumb } from "@/components/BreadCrumb";
import { PageLayout } from "@/layouts/PageLayout";
import { Contacts } from "@/view/Contacts";

export default function ContactsPage() {
    const items = [{ label: "Контакты" }];

    return (
        <PageLayout
            title="Контакты Lift Media Group – Свяжитесь с нами для размещения рекламы"
            description="Контакты рекламного агентства Lift Media Group. Телефон, email, адрес офиса. Закажите расчет стоимости рекламы прямо сейчас!"
        >
            <BreadCrumb model={items} />
            <Contacts />
        </PageLayout>
    );
}
