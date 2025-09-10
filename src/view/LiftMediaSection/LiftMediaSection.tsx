import { useEffect, useState } from "react";
import cnBind from "classnames/bind";
import { useRouter } from "next/router";

import { FormFeedback } from "@/components/_Forms/FormFeedback";
import { ModalFeedBack } from "@/components/_Modals/ModalFeedBack";
import { MapView } from "@/components/MapView";
import type { GetBuildDto, GetCategoryAreaDto } from "@/entities/types/entities";
import { API_BASE } from "@/shared/constants/private";
import { useBooleanState } from "@/shared/hooks";
import { Dropdown } from "@/shared/ui/_Dropdown";
import { Button } from "@/shared/ui/Button";
import { CustomImage } from "@/shared/ui/CustomImage";
import { filterByStatus } from "@/shared/utils/filterAndSort/getSortDirection";

import styles from "./LiftMediaSection.module.scss";

const cx = cnBind.bind(styles);
type Props = {
    district: GetCategoryAreaDto;
    units: GetBuildDto[];
    url?: string;
    title?: string;
};
export const LiftMediaSection = ({ district, units, url, title }: Props) => {
    const [isOpen, open, close] = useBooleanState(false);
    const href = useRouter();

    const [unit, setUnit] = useState<GetBuildDto | null>(null);
    useEffect(() => {
        if (Array.isArray(units) && units.length > 0 && !unit) {
            setUnit(units[0]);
        }
    }, [units, unit]);

    return (
        <div className={cx("lift-media-section")}>
            <div className={cx("wrapper-map")}>
                <div className={cx("wrapper", "container")}>
                    <div className={cx("header")}>
                        <h3>
                            {title} {district?.area?.name} район
                        </h3>
                    </div>
                    <div className={cx("map-content")}>
                        <MapView
                            center={
                                district?.build[0]?.coordinates?.[0] || district?.build[0]?.buildAreaCoordinates?.[0]
                            }
                            zoom={12}
                            build={filterByStatus(district?.build || [])}
                            name={`${district?.area?.name} район`}
                            maxZoom={25}
                            minZoom={5}
                            handleLink={({ id, urlTitle }) =>
                                href.push(
                                    {
                                        pathname: `${url}/[entity]`,
                                        query: { slug: urlTitle, entity: id },
                                    },
                                    `${url}/${urlTitle}`,
                                )
                            }
                            isMain
                        />
                        <div className={cx("list")}>
                            {district?.list?.map((el, index) => (
                                <div className={cx("item")} key={index}>
                                    <span>{el.title}:</span>
                                    <span>{Math.floor(Number(el.value))}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx("footer")}>
                        <h4>{district?.title}</h4>
                        <div className={cx("list-text")}>{district?.description}</div>
                    </div>
                    <Button label="Оставить заявку" onClick={open} className={cx("button")} />
                </div>
            </div>
            <div className={cx("wrapper-lift-media-us")}>
                <div className={cx("lift-media-us")}>
                    <div className={cx("wrapper", "container")}>
                        <div className={cx("header")}>
                            <h2>Выберите рекламную площадку для детальной информации</h2>
                        </div>

                        <div className={cx("items")}>
                            <Dropdown
                                options={units ?? []}
                                value={unit}
                                onChange={(e) => setUnit(e.value)}
                                optionLabel="name"
                                className={cx("dropdown")}
                            />
                            <Button
                                label="Перейти"
                                onClick={() =>
                                    href.push(
                                        {
                                            pathname: `${url}/[entity]`,
                                            query: { slug: unit?.urlTitle, entity: unit?.id },
                                        },
                                        `${url}/${unit?.urlTitle}`,
                                    )
                                }
                                className={cx("button")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("container-lift")}>
                <div className={cx("wrapper", "container")}>
                    {district?.pictureId && (
                        <CustomImage
                            className={cx("image")}
                            width={1200}
                            height={423}
                            src={`${API_BASE}/picture/${district?.pictureId}`}
                            alt={district?.area?.name || "def"}
                        />
                    )}

                    <div className={cx("description")}>{district?.subTitle}</div>
                </div>
            </div>
            <div className={cx("form")}>
                <FormFeedback />
            </div>
            <ModalFeedBack isOpen={isOpen} onClose={close} />
        </div>
    );
};
