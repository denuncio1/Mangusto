import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
  }
>(
  ({ id, className, children, config }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color,
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      indicator?: "line" | "dot" | "dashed";
      hideLabel?: boolean;
      hideIndicator?: boolean;
      label?: string;
      labelFormatter?: (label: any, payload: any[]) => React.ReactNode;
      payloadFormatter?: (payload: any) => React.ReactNode;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      payloadFormatter,
      ...props
    },
    ref,
  ) => {
    const { config } = useChart();

    if (!active || !payload?.length) {
      return null;
    }

    const itemConfig = config[payload[0].dataKey as string];

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
        {...props}
      >
        {!hideLabel && (
          <div className="font-medium">
            {label || labelFormatter?.(payload[0].payload, payload) || payload[0].payload.x}
          </div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, i) => {
            const itemConfig = config[item.dataKey as string];
            const color = itemConfig?.color || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn("flex items-center gap-2 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
              >
                {payloadFormatter ? (
                  payloadFormatter(item)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("h-2 w-2 shrink-0 rounded-[2px]", {
                            "rounded-full": indicator === "dot",
                            "bg-transparent ring-1 ring-inset ring-current": indicator === "dashed",
                          })}
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      )
                    )}
                    <div className="flex flex-1 justify-between leading-none">
                      <p className="text-muted-foreground">{itemConfig?.label || item.name}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = RechartsPrimitive.Tooltip.displayName;

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      name?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", name }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload.map((item) => {
        const itemConfig = config[item.dataKey as string];
        const color = itemConfig?.color || item.color;

        return (
          <div
            key={item.value}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
            )}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Re-export all primitive components from recharts
const Chart = ChartContainer;
const BarChart = RechartsPrimitive.BarChart;
const LineChart = RechartsPrimitive.LineChart;
const PieChart = RechartsPrimitive.PieChart;
const RadarChart = RechartsPrimitive.RadarChart;
const RadialBarChart = RechartsPrimitive.RadialBarChart;
const AreaChart = RechartsPrimitive.AreaChart;
const FunnelChart = RechartsPrimitive.FunnelChart;
const ScatterChart = RechartsPrimitive.ScatterChart;
const ComposedChart = RechartsPrimitive.ComposedChart;
const Treemap = RechartsPrimitive.Treemap;
const Sankey = RechartsPrimitive.Sankey;

const XAxis = RechartsPrimitive.XAxis;
const YAxis = RechartsPrimitive.YAxis;
const ZAxis = RechartsPrimitive.ZAxis;

const Bar = RechartsPrimitive.Bar;
const Line = RechartsPrimitive.Line;
const Pie = RechartsPrimitive.Pie;
const Radar = RechartsPrimitive.Radar;
const RadialBar = RechartsPrimitive.RadialBar;
const Area = RechartsPrimitive.Area;
const Funnel = RechartsPrimitive.Funnel;
const Scatter = RechartsPrimitive.Scatter;
const Cell = RechartsPrimitive.Cell;

const Tooltip = ChartTooltip;
const Legend = ChartLegend;
const ResponsiveContainer = RechartsPrimitive.ResponsiveContainer;
const CartesianGrid = RechartsPrimitive.CartesianGrid;
const ReferenceLine = RechartsPrimitive.ReferenceLine;
const Label = RechartsPrimitive.Label;
const LabelList = RechartsPrimitive.LabelList;
const Customized = RechartsPrimitive.Customized;
const Brush = RechartsPrimitive.Brush;

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
  // Re-export all primitive components from recharts
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  RadialBarChart,
  AreaChart,
  FunnelChart,
  ScatterChart,
  ComposedChart,
  Treemap,
  Sankey,
  XAxis,
  YAxis,
  ZAxis,
  Bar,
  Line,
  Pie,
  Radar,
  RadialBar,
  Area,
  Funnel,
  Scatter,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Label,
  LabelList,
  Customized,
  Brush,
};
