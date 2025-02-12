import { useState } from "react";
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
    const [unit, setUnit] = useState<GetBuildDto>(units[0]);

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
                            list={district.list}
                            center={district?.build[0]?.coordinates?.[0]}
                            zoom={11}
                            build={district?.build || []}
                            name={`${district?.area?.name} район`}
                            maxZoom={25}
                            minZoom={5}
                            handleLink={(id) => href.push(`${url}/${id}`)}
                        />
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
                            <h2>Выберите юнит для детальной информации</h2>
                        </div>

                        <div className={cx("items")}>
                            <Dropdown
                                options={units}
                                value={unit}
                                onChange={(e) => setUnit(e.value)}
                                optionLabel="name"
                                className={cx("dropdown")}
                            />
                            <Button
                                label="Перейти"
                                onClick={() => href.push(`${url}/${unit.id}`)}
                                className={cx("button")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("container-lift")}>
                <div className={cx("wrapper", "container")}>
                    <CustomImage
                        className={cx("image")}
                        width={1200}
                        height={423}
                        src={`${API_BASE}/picture/${district?.pictureId}`}
                        alt={district?.area?.name || "def"}
                    />

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
