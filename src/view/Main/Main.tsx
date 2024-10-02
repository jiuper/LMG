import { PageLayout } from "@/layouts/PageLayout";
import { AboutUsBlock } from "@/view/Main/component/AboutUsBlock";
import { CaseBlock } from "@/view/Main/component/CaseBlock";
import { MainBlock } from "@/view/Main/component/MainBlock";
import { ServicesBlock } from "@/view/Main/component/ServicesBlock";

type Props = {};
export const Main = (props: Props) => {
    return (
        <PageLayout>
            <MainBlock />
            <ServicesBlock />
            <CaseBlock />
            <AboutUsBlock />
        </PageLayout>
    );
};
