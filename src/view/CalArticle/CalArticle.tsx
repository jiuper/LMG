import { useEffect, useState } from "react";
import cnBind from "classnames/bind";
import Link from "next/link";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import cal from "@/shared/assests/Frame 433.png";
import { EyeIcon, TimeIcon } from "@/shared/assests/svg/svg";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./CalArticle.module.scss";

const cx = cnBind.bind(styles);

export const CalArticle = () => {
    const [views, setViews] = useState<number>(0);

    useEffect(() => {
        const currentViews = localStorage.getItem("pageViews");
        const newViews = currentViews ? parseInt(currentViews, 10) + 1 : 1;
        localStorage.setItem("pageViews", newViews.toString());
        setViews(newViews);
    }, []);

    return (
        <div className={cx("articel")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("card")}>
                    <div className={cx("header")}>
                        <div className={cx("title")}>
                            <h2>Закон о рекламе: </h2>
                            <span>Основные положения и правила</span>
                        </div>
                        <div className={cx("info")}>
                            <div className={cx("date")}>
                                <div className={cx("icon-wrapper")}>
                                    <EyeIcon />
                                    <span>{views}</span>
                                </div>
                                <div className={cx("icon-wrapper")}>
                                    <TimeIcon />
                                    <span>3 мин.</span>
                                </div>
                            </div>
                            <div className={cx("buttons")}>
                                <Button label="Поделиться" className={cx("button")} />
                                <Button label="Заказать звонок" className={cx("button")} />
                            </div>
                        </div>
                    </div>
                    <div className={cx("body")}>
                        <div className={cx("text")}>
                            <CustomImage className={cx("image")} width={1136} height={423} src={cal} alt="img" />
                            <span className={cx("title")}>
                                Закон о рекламе регулирует рекламную деятельность, обеспечивая ее прозрачность и
                                добросовестность. Он направлен на защиту потребителей от недобросовестной и вводящей в
                                заблуждение рекламы, а также устанавливает требования для рекламодателей и
                                рекламораспространителей. В России основной правовой акт, регулирующий рекламную сферу,
                                — это Федеральный закон «О рекламе», принятый 13 марта 2006 года.
                            </span>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}>Основные положения закона:</h4>
                            <div className={cx("list-text")}>
                                <span className={cx("text")}>
                                    Запрет на ложную рекламу Реклама не должна содержать недостоверную информацию. Это
                                    касается не только конкретных характеристик товаров или услуг, но и их
                                    производителя, условий приобретения, скидок, акций. Нарушение этого правила может
                                    привести к штрафам и искам от потребителей или конкурентов.
                                </span>
                                <span className={cx("text")}>
                                    Честная реклама Рекламные сообщения должны быть правдивыми и не вводить потребителя
                                    в заблуждение. Все утверждения в рекламе должны иметь доказательства, а любое
                                    преувеличение характеристик продукта или услуги запрещено.
                                </span>
                                <span className={cx("text")}>
                                    Специальные требования к определенным видам рекламы Закон устанавливает специальные
                                    требования для рекламы отдельных категорий товаров, таких как:
                                </span>
                                <div className={cx("list-text-wrapper")}>
                                    <span className={cx("text")}>
                                        Лекарства и медицинские изделия. Реклама не должна гарантировать 100% результат
                                        или указывать на отсутствие побочных эффектов. Алкоголь. Алкогольная реклама
                                        ограничена по времени и месту распространения. Запрещено рекламировать алкоголь
                                        на телевидении в дневное время и на детских площадках.
                                    </span>
                                    <span className={cx("text")}>
                                        Финансовые услуги. Реклама должна содержать полную информацию о рисках и
                                        условиях.
                                    </span>
                                    <span className={cx("text")}>
                                        Реклама для детей Закон запрещает использование в рекламе образов, которые могут
                                        негативно влиять на детей. Реклама не должна поощрять покупку товаров через
                                        давление на ребенка или его родителей. Также существуют ограничения на рекламу в
                                        детских передачах.
                                    </span>
                                </div>
                                <span className={cx("text")}>
                                    Скрытая реклама Запрещается использование методов скрытой рекламы, которая не
                                    идентифицируется как реклама. Например, скрытая реклама в фильмах или передачах
                                    может быть воспринята как манипуляция потребителем.
                                </span>
                                <span className={cx("text")}>
                                    Этичность рекламы Реклама не должна нарушать общепринятые нормы морали и этики. Это
                                    касается как содержания, так и формы подачи информации. Нарушение этих норм может
                                    привести к административным санкциям и запрету рекламы.
                                </span>
                            </div>
                        </div>

                        <div className={cx("list")}>
                            <h4 className={cx("title")}>Ответственность за нарушение закона:</h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    За нарушение законодательства о рекламе предусмотрены серьезные санкции, включая:
                                </span>
                                <br />
                                <span className={cx("text")}>
                                    Административные штрафы для рекламодателей и рекламораспространителей.
                                </span>
                                <span className={cx("text")}>Изъятие недобросовестной рекламы из оборота.</span>
                                <span className={cx("text")}>
                                    Компенсация убытков потребителям, пострадавшим от ложной или вводящей в заблуждение
                                    рекламы.
                                </span>
                                <span className={cx("text")}>
                                    Закон также предусматривает механизм рассмотрения жалоб на рекламу через Федеральную
                                    антимонопольную службу (ФАС). Потребители и компании могут обращаться в ФАС с
                                    жалобами на нарушения, и в случае признания нарушений реклама будет снята с показа,
                                    а виновные понесут ответственность.
                                </span>
                            </div>
                        </div>

                        <div className={cx("list")}>
                            <h4 className={cx("title")}>Заключение</h4>
                            <span className={cx("text")}>
                                Закон о рекламе играет ключевую роль в обеспечении честной конкуренции на рынке и защите
                                прав потребителей. Следование установленным правилам позволяет компаниям строить свою
                                рекламную стратегию на доверии и прозрачности, что способствует долгосрочному успеху
                                бизнеса.
                            </span>
                        </div>
                        <div className={cx("links")}>
                            <h4 className={cx("title")}>Ссылка на законодательные акты</h4>
                            <Link className={cx("link")} href="/">
                                Как делать рекламу?
                            </Link>
                            <Link className={cx("link")} href="/">
                                Список того что нельзя рекламировать
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
