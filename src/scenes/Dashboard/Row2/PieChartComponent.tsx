import { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

// Data for the pie chart
const data = [
  { name: "Fresh", value: 400 },
  { name: "Ambient", value: 300 },
  { name: "Frozen", value: 300 },
  { name: "Alcohol", value: 200 },
  { name: "Directs", value: 400 },
];

// Type definition for shape props used in renderActiveShape function
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

// Function to render the active shape in the pie chart
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

  // Calculate the coordinates for drawing the active shape
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
      {/* Display the name of the active shape */}
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      {/* Draw the active sector of the pie chart */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Draw the outer border of the active sector */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* Draw a line connecting the center of the pie chart to the outer border of the active shape */}
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      {/* Draw a circle at the end of the line */}
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      {/* Display the value of the active shape */}
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#ff8d2c"
      >{`Cases ${value}`}</text>
      {/* Display the percentage of the active shape */}
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

  // Function to handle mouse enter event on the pie chart
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        {/* Define a linear gradient for the pie chart */}
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
