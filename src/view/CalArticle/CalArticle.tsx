import { useEffect, useState } from "react";
import cnBind from "classnames/bind";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import cal from "@/shared/assests/Frame 433.png";
import { EyeIcon, TimeIcon } from "@/shared/assests/svg/svg";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./CalArticle.module.scss";

const cx = cnBind.bind(styles);

export const CalArticle = () => {
    const [views, setViews] = useState<number>(0);
    const [showFormFeedback, open, close] = useBooleanState(false);

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
                                <Button onClick={open} label="Заказать звонок" className={cx("button")} />
                            </div>
                        </div>
                    </div>
                    <div className={cx("body")}>
                        <div className={cx("text")}>
                            <CustomImage className={cx("image")} width={1136} height={423} src={cal} alt="img" />
                            <span className={cx("title")}>
                                Закон о рекламе в Российской Федерации (Федеральный закон №38-ФЗ от 13 марта 2006 года)
                                регулирует рекламную деятельность, определяет допустимые формы рекламы и устанавливает
                                ограничения для обеспечения защиты прав граждан и организаций. Вот основные 20% выводов,
                                которые дают понимание 80% ключевых аспектов:
                            </span>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}>1. Основные принципы регулирования рекламы: </h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Честность и достоверность: Реклама не должна содержать ложную информацию, вводить
                                    в заблуждение или преувеличивать свойства товара/услуги.
                                </span>
                                <span className={cx("text")}>
                                    - Запрет на дискриминацию: Реклама не должна унижать достоинство по признакам пола,
                                    расы, национальности, профессии или другим критериям.
                                </span>
                                <span className={cx("text")}>
                                    - Защита конкуренции: Запрещается недобросовестная реклама, например, оскорбление
                                    конкурентов или некорректные сравнения их продукции.
                                </span>
                            </div>
                        </div>

                        <div className={cx("list")}>
                            <h4 className={cx("title")}> 2. Запрещённые виды рекламы:</h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Алкогольная продукция: Реклама алкоголя строго ограничена, её нельзя размещать на
                                    телевидении, радио, в Интернете (за исключением специализированных сайтов).
                                </span>
                                <span className={cx("text")}>
                                    - Табачные изделия: Полный запрет на рекламу табака и связанных товаров.
                                </span>
                                <span className={cx("text")}>
                                    - Наркотические средства и психотропные вещества: Полностью запрещены.{" "}
                                </span>
                                <span className={cx("text")}>
                                    - Этичные ограничения: Реклама, побуждающая к насилию, жестокости, а также способная
                                    причинить вред детям, запрещена.
                                </span>
                            </div>
                        </div>

                        <div className={cx("list")}>
                            <h4 className={cx("title")}>3. Реклама для детей:</h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Особые ограничения: Реклама не должна формировать у детей комплексы
                                    неполноценности или подталкивать к действиям, наносящим вред их здоровью.
                                </span>
                                <span className={cx("text")}>
                                    - Игрушки: В рекламе игрушек недопустимы сцены насилия.
                                </span>
                            </div>
                        </div>

                        <div className={cx("list")}>
                            <h4 className={cx("title")}> 4. Требования к содержанию рекламы:</h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Указание юридического лица: Реклама должна содержать данные рекламодателя
                                    (юридическое или физическое лицо).
                                </span>
                                <span className={cx("text")}>
                                    - Мелкий шрифт и дисклеймеры: Информация о правах, рисках и других важных деталях
                                    должна быть легко читаемой и понятной.
                                </span>
                            </div>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}>5. Ответственность за нарушение закона: </h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Штрафы: Значительные штрафы для физических лиц, должностных лиц и организаций,
                                    нарушивших закон.
                                </span>
                                <span className={cx("text")}>
                                    - Аннулирование рекламных материалов: Нелегальная реклама подлежит удалению или
                                    исправлению.
                                </span>
                            </div>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}>6. Реклама финансовых услуг и кредитов: </h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>- Обязательное указание полной процентной ставки.</span>
                                <span className={cx("text")}>
                                    - Запрещены вводящие в заблуждение фразы вроде «кредит бесплатно».
                                </span>
                            </div>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}> 7. Реклама лекарств и медицинских услуг: </h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Запрещено утверждать гарантированный результат лечения.{" "}
                                </span>
                                <span className={cx("text")}>
                                    - Реклама рецептурных препаратов разрешена только в специализированных изданиях.
                                </span>
                            </div>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}> 8. Специальные ограничения: </h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Интернет-реклама: Должна соответствовать тем же нормам, что и офлайн-реклама.
                                    Кроме того, необходимо предоставлять возможность её идентификации.{" "}
                                </span>
                                <span className={cx("text")}>
                                    - Телевизионная и радиореклама: Ограничение по времени и содержанию, например, не
                                    более 20% эфирного времени.
                                </span>
                            </div>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}>9. Реклама в общественных местах: </h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - Запрещено размещать рекламу на дорожных знаках или вблизи них, если она отвлекает
                                    внимание водителей.
                                </span>
                                <span className={cx("text")}>
                                    - Оговариваются требования к наружной рекламе: безопасность, видимость, согласование
                                    с местными властями.
                                </span>
                            </div>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}>10. Контроль и надзор: </h4>
                            <div className={cx("list-text-wrapper")}>
                                <span className={cx("text")}>
                                    - ФАС (Федеральная антимонопольная служба): Орган, ответственный за соблюдение
                                    закона. ФАС рассматривает жалобы, проводит проверки и выносит решения.
                                </span>
                                <span className={cx("text")}>
                                    - Сроки: Жалобы на рекламу рассматриваются в срок до 30 дней.
                                </span>
                            </div>
                        </div>
                        <div className={cx("list")}>
                            <h4 className={cx("title")}> Вывод: </h4>
                            <span className={cx("text")}>
                                Закон о рекламе в РФ ориентирован на защиту прав потребителей и обеспечение честной
                                конкуренции. Основные ограничения касаются запрещённых видов товаров (алкоголь, табак),
                                недобросовестной информации и рекламы, влияющей на детей. Соблюдение закона требует
                                чёткого соответствия требованиям по содержанию, размещению и формату рекламы
                            </span>
                        </div>
                        <div className={cx("links")}>
                            <h4 className={cx("title")}>Ссылка на законодательные акты</h4>
                            <a
                                target="_blank"
                                className={cx("link")}
                                href="http://pravo.gov.ru/proxy/ips/?docbody=&nd=102105292&rdk=92"
                            >
                                Как делать рекламу?
                            </a>
                            <a
                                target="_blank"
                                className={cx("link")}
                                href="http://pravo.gov.ru/proxy/ips/?docbody=&nd=102105292&rdk=92"
                            >
                                Список того что нельзя рекламировать
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
            <ModalFeedBack isOpen={showFormFeedback} onClose={close} />
        </div>
    );
};
