import { useEffect, useMemo, useState } from "react";
import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import type { CreateNewsDto } from "@/entities/types/entities";
import { EyeIcon, TimeIcon } from "@/shared/assests/svg/svg";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";

import styles from "./Articel.module.scss";

type Props = {
    date?: CreateNewsDto;
    list?: { title: string; id: string }[];
};

const cx = cnBind.bind(styles);
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const options = { day: "numeric", month: "long" } as const;
    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", options);
};
export const Articel = ({ date, list }: Props) => {
    const [views, setViews] = useState<number>(0);
    const href = useRouter();
    const formattedDate = useMemo(() => formatDate(date?.createdAt), [date]);
    useEffect(() => {
        const currentViews = localStorage.getItem("pageViews");
        const newViews = currentViews ? parseInt(currentViews, 10) + 1 : 1;
        localStorage.setItem("pageViews", newViews.toString());
        setViews(newViews);
    }, []);
    const [showFormFeedback, open, close] = useBooleanState(false);

    return (
        <div className={cx("articel")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("card")}>
                    <div className={cx("header")}>
                        <div className={cx("title")}>
                            <h2>{date?.title}</h2>
                            <span>{date?.subtitle}</span>
                        </div>
                        <div className={cx("info")}>
                            <div className={cx("date")}>
                                <span>{formattedDate}</span>
                                <div className={cx("icon-wrapper")}>
                                    <EyeIcon />
                                    <span>{views}</span>
                                </div>
                                <div className={cx("icon-wrapper")}>
                                    <TimeIcon />
                                    <span>{date?.time} мин</span>
                                </div>
                            </div>
                            <div className={cx("buttons")}>
                                <Button onClick={open} label="Заказать звонок" className={cx("button")} />
                            </div>
                        </div>
                    </div>
                    <div className={cx("body")}>
                        <div className={cx("text")}>
                            <CustomImage
                                className={cx("image")}
                                width={1136}
                                height={423}
                                src={`${API_BASE}/picture/${date?.contentItems?.[0]?.pictureId}`}
                                alt="imgа"
                            />
                            {date?.contentItems?.[0]?.text && <span>{date?.contentItems?.[0].text}</span>}
                        </div>

                        <div className={cx("list-wrapper")}>
                            {date?.list &&
                                date.list.length > 0 &&
                                date.list.map((item, i) => (
                                    <div className={cx("list")} key={i}>
                                        <h4 className={cx("title")}>{item.title}</h4>
                                        <div className={cx("list-text")}>
                                            {item.items?.map((item, idx) => <span key={idx}>{item}</span>)}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {date?.contentItems?.[1]?.text && <span>{date?.contentItems?.[1].text}</span>}
                        <div className={cx("media")}>
                            {date?.videoId !== null && date?.videoId !== "" ? (
                                <video className={cx("image")} src={`${API_BASE}/video/${date?.videoId}`}>
                                    <source src={`${API_BASE}/video/${date?.videoId}`} type="video/mp4" />
                                </video>
                            ) : (
                                date?.contentItems?.[1]?.pictureId !== null &&
                                date?.contentItems?.[1]?.pictureId !== "" && (
                                    <CustomImage
                                        className={cx("image")}
                                        width={1136}
                                        height={423}
                                        src={`${API_BASE}/picture/${date?.contentItems?.[1]?.pictureId}`}
                                        alt="img"
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
                {list ? (
                    <div className={cx("aside")}>
                        <h4 className={cx("title")}>Читайте также</h4>
                        <div className={cx("list")}>
                            {list.map((el, i) => (
                                <div onClick={() => href.push(`/articles/${el.id}`)} className={cx("item")} key={i}>
                                    {el.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>

            <div className={cx("form")}>
                <FormFeedback />
            </div>
            <ModalFeedBack isOpen={showFormFeedback} onClose={close} />
        </div>
    );
};
