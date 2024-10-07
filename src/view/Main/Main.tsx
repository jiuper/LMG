import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { PageLayout } from "@/layouts/PageLayout";
import { AboutUsBlock } from "@/view/Main/component/AboutUsBlock";
import { CaseBlock } from "@/view/Main/component/CaseBlock";
import { CooperationBlock } from "@/view/Main/component/CooperationBlock";
import { HelperBlock } from "@/view/Main/component/HelperBlock";
import { HistoryBlock } from "@/view/Main/component/HistoryBlock";
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
            <HistoryBlock />
            <HelperBlock />
            <CooperationBlock />
            <FormFeedback />
        </PageLayout>
    );
};
