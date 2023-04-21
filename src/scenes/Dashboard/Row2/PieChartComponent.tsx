import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const data = [
  { name: "Fresh", value: 400 },
  { name: "Ambient", value: 300 },
  { name: "Frozen", value: 300 },
  { name: "Alcohol", value: 200 },
  { name: "Directs", value: 400 },
];

type shapeProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: { name: string; value: number };
  percent: number;
  value: number;
};

const renderActiveShape = (props: shapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#ff8d2c"
      >{`Cases ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={"red"}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartComponent() {
  const [activeIndex, setActiveIndex] = useState(1);

  const { palette } = useTheme();
  const colors = tokens(palette.mode);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <defs>
          <linearGradient id="pieChart" x1="0" y1="1" x2="1" y2="0">
            <stop offset="10%" stopColor={colors.green[500]} stopOpacity={1} />
            <stop
              offset="90%"
              stopColor={colors.green[400]}
              stopOpacity={0.4}
            />
          </linearGradient>
        </defs>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={60}
          fill={"url(#pieChart)"}
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
