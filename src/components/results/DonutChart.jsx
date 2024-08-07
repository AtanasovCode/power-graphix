import { useContext, useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
import { ChartContext } from "../../routes/LiftResult";
import { CustomTooltip } from "../CustomTooltip";

const DonutChartComponent = () => {

    const {
        exercises,
        COLORS,
        chartHeight,
        theme,
    } = useContext(ChartContext);

    const size = useWindowSize();

    const [outerRadius, setOuterRadius] = useState(160);
    const [innerRadius, setInnerRadius] = useState(50);

    useEffect(() => {
        let w = size.width;

        if (w > 425) {
            setOuterRadius(160);
            setInnerRadius(50)
        }

        if (w <= 425) {
            setOuterRadius(95);
            setInnerRadius(30)
        }
    }, [size])

    return (
        <ResponsiveContainer width="99%" height={chartHeight}>
            <PieChart>
                <Pie
                    data={exercises}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    paddingAngle={3}
                    fill="#8884d8"
                    dataKey="pr"
                    label
                >
                    {
                        exercises.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="none"
                            />
                        ))
                    }
                </Pie>
                <Tooltip content={
                    <CustomTooltip
                        chartType={sessionStorage.getItem("chartType")}
                    />
                } />
                <Legend
                    wrapperStyle={{ fontSize: "12px", bottom: "-10px" }}
                    iconType="circle"
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default DonutChartComponent;