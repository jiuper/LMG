import { FormFeedback } from "@/components/_Forms/FormFeedback";
import type { CreateNewsDto, GetPortfolioDto } from "@/entities/types/entities";
import { PageLayout } from "@/layouts/PageLayout";
import { AboutUsBlock } from "@/view/Main/component/AboutUsBlock";
import { CaseBlock } from "@/view/Main/component/CaseBlock";
import { CooperationBlock } from "@/view/Main/component/CooperationBlock";
import { FeedBackSlide } from "@/view/Main/component/FeedBackSlide";
import { HelperBlock } from "@/view/Main/component/HelperBlock";
import { HistoryBlock } from "@/view/Main/component/HistoryBlock";
import { MainBlock } from "@/view/Main/component/MainBlock";
import { ServicesBlock } from "@/view/Main/component/ServicesBlock";

type Props = {
    articles?: CreateNewsDto[];
    news?: CreateNewsDto[];
    port?: GetPortfolioDto[];
};
export const Main = ({ news, articles, port }: Props) => {
    return (
        <PageLayout>
            <MainBlock />
            <ServicesBlock />
            <FeedBackSlide />
            <CaseBlock listItem={port || []} />
            <AboutUsBlock />
            <HistoryBlock />
            <HelperBlock news={news} articles={articles} />
            <CooperationBlock />
            <FormFeedback />
        </PageLayout>
    );
};
