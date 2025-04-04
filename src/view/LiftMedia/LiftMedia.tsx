import { useEffect, useRef, useState } from "react";
import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapView } from "@/components/MapView";
import type { GetCategoryAreaDto, GetCategoryDto, GetPortfolioDto } from "@/entities/types/entities";
import preview from "@/shared/assests/photo_2024-12-17_13-29-45.png";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";
import { listStepsOne } from "@/view/LiftMedia/const";
import { CaseBlock } from "@/view/Main/component/CaseBlock";

import styles from "./LiftMedia.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    port: GetPortfolioDto[];
    data: GetCategoryDto;
    districts: GetCategoryAreaDto[];
    url?: string;
    urlGeneral?: string;
};
export const LiftMedia = ({ port, data, districts, url, urlGeneral }: Props) => {
    const href = useRouter();
    const [isOpen, open, close] = useBooleanState(false);
    const { title, description, pictureId, videoId, list } = data;
    const [isActive, setActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showVideo, setShowVideo] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const handleRouteChangeStart = () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setShowVideo(false);
            }
        };
        const handleRouteChangeComplete = () => {
            if (videoRef.current) {
                videoRef.current.load();
            }
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);
        router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, [router.events]);
    const handlePlay = () => {
        setShowVideo(true);

        if (videoRef.current) {
            void videoRef.current.play();
        }
    };

    return (
        <div className={cx("lift-media")}>
            <div className={cx("main-block")} style={{ backgroundImage: `url(${API_BASE}/picture/${pictureId})` }}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("content")}>
                        <h1>{title}</h1>
                        <span>{description}</span>
                        <Button className={cx("button-main")} mode="empty" onClick={open} label="Заказать звонок" />
                    </div>
                </div>
                <ModalFeedBack isOpen={isOpen} onClose={close} />
            </div>
            {districts.length ? (
                <div className={cx("wrapper-map")}>
                    <div className={cx("wrapper", "container")}>
                        <div className={cx("header")}>
                            <h3>Доступные районы</h3>
                        </div>
                        <div className={cx("map-content")}>
                            <MapView
                                zoom={10}
                                build={districts.flatMap((item) =>
                                    filterByStatus(
                                        (item.build ?? []).map((el) => ({
                                            ...el,
                                            district: item.area.name,
                                            categoryId: item.categoryId,
                                            categoryAreaId: item.id,
                                        })),
                                    ),
                                )}
                                handleLink={({ id, urlTitle }) =>
                                    href.push(
                                        {
                                            pathname: `${urlGeneral}/[district]`,
                                            query: { slug: urlTitle, district: id },
                                        },
                                        `${urlGeneral}/${urlTitle}`,
                                    )
                                }
                                isMain
                            />
                            <div className={cx("items", isActive && "active")}>
                                {districts?.map((el, i) => (
                                    <div
                                        key={i}
                                        onClick={() =>
                                            router.push(
                                                {
                                                    pathname: `${url}/[district]`,
                                                    query: { slug: el.urlTitle, district: el.id },
                                                },
                                                `${url}/${el.urlTitle}`,
                                            )
                                        }
                                        className={cx("item")}
                                    >
                                        <h4>{el.area?.name}</h4>
                                    </div>
                                ))}
                            </div>
                            {districts.length >= 4 && (
                                <Button
                                    label="Показать все районы"
                                    onClick={() => setActive(!isActive)}
                                    className={cx("button")}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
            <div className={cx("wrapper-lift-media-us")}>
                <div className={cx("lift-media-us")}>
                    <div className={cx("wrapper", "container")}>
                        <div className={cx("header")}>
                            <h2>{list?.title}</h2>
                        </div>

                        <div className={cx("items")}>
                            {list?.items?.map((el, i) => (
                                <div key={i} className={cx("item")}>
                                    <h3>
                                        <strong>{el.caption}</strong>
                                    </h3>
                                    <span>{el.subcaption}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {videoId !== null && (
                <div className={cx("wrapper-video")}>
                    <h2>Как это работает</h2>
                    <div className={cx("video-container")} onClick={handlePlay}>
                        <CustomImage
                            src={preview}
                            alt="Превью видео"
                            className={cx("video-preview", { showVideo })}
                            width={800}
                            height={450}
                        />

                        <video ref={videoRef} className={cx("video")} width="800" height="450" controls preload="none">
                            <source src={`${API_BASE}/video/${videoId}`} type="video/webm" />
                        </video>
                    </div>
                </div>
            )}

            <div className={cx("loyalty-program")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <h3>Как это работает</h3>
                    </div>
                    <div className={cx("content-loyalty")}>
                        <div className={cx("list")}>
                            {listStepsOne.map((el, i) => (
                                <div key={i} className={cx("item-wrapper")}>
                                    {!el.type ? (
                                        <div className={cx("item")}>
                                            <CustomImage width={48} height={48} src={el.icon} alt={el.icon} />
                                            <span className={cx("title")}>{el.title}</span>
                                        </div>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="88"
                                            height="16"
                                            viewBox="0 0 88 16"
                                            fill="none"
                                            className={cx("arrow")}
                                            style={{ opacity: i !== 2 ? 1 : 0 }}
                                        >
                                            <path
                                                d="M1.66602 7C1.11373 7 0.666016 7.44772 0.666016 8C0.666016 8.55228 1.11373 9 1.66602 9V7ZM87.7065 8.70711C88.097 8.31658 88.097 7.68342 87.7065 7.29289L81.3425 0.928932C80.952 0.538408 80.3188 0.538408 79.9283 0.928932C79.5378 1.31946 79.5378 1.95262 79.9283 2.34315L85.5851 8L79.9283 13.6569C79.5378 14.0474 79.5378 14.6805 79.9283 15.0711C80.3188 15.4616 80.952 15.4616 81.3425 15.0711L87.7065 8.70711ZM1.66602 9H6.99935V7H1.66602V9ZM17.666 9H28.3327V7H17.666V9ZM38.9994 9H49.666V7H38.9994V9ZM60.3327 9H70.9994V7H60.3327V9ZM81.666 9H86.9994V7H81.666V9Z"
                                                fill="#566DD6"
                                            />
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>

                        <Button className={cx("button")} label="Получить клиентов" onClick={open} />
                    </div>
                </div>
            </div>

            {port.length !== 0 && (
                <div className={cx("portfolio")}>
                    <CaseBlock className={cx("case-block")} listItem={port.slice(-4)} />
                </div>
            )}
            <div className={cx("form")}>
                <FormFeedback />
            </div>
        </div>
    );
};
