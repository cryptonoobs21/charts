"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { chartDatas } from "./utils"
const chartData = [
    { "hour": "00:00", "temperature": 23.1, "humidity": 62, "wind_speed": 5.5, "precipitation": 0.0 },
    { "hour": "01:00", "temperature": 22.4, "humidity": 65, "wind_speed": 5.1, "precipitation": 0.0 },
    { "hour": "02:00", "temperature": 21.8, "humidity": 67, "wind_speed": 5.3, "precipitation": 0.2 },
    { "hour": "03:00", "temperature": 21.5, "humidity": 69, "wind_speed": 5.4, "precipitation": 0.1 },
    { "hour": "04:00", "temperature": 21.0, "humidity": 71, "wind_speed": 5.6, "precipitation": 0.3 },
    { "hour": "05:00", "temperature": 20.8, "humidity": 73, "wind_speed": 5.7, "precipitation": 0.0 },
    { "hour": "06:00", "temperature": 20.9, "humidity": 72, "wind_speed": 5.5, "precipitation": 0.0 },
    { "hour": "07:00", "temperature": 21.7, "humidity": 70, "wind_speed": 5.3, "precipitation": 0.0 },
    { "hour": "08:00", "temperature": 22.5, "humidity": 68, "wind_speed": 5.1, "precipitation": 0.1 },
    { "hour": "09:00", "temperature": 23.4, "humidity": 66, "wind_speed": 5.4, "precipitation": 0.0 },
    { "hour": "10:00", "temperature": 24.2, "humidity": 63, "wind_speed": 5.6, "precipitation": 0.0 },
    { "hour": "11:00", "temperature": 25.0, "humidity": 60, "wind_speed": 5.8, "precipitation": 0.0 },
    { "hour": "12:00", "temperature": 26.1, "humidity": 57, "wind_speed": 6.0, "precipitation": 0.1 },
    { "hour": "13:00", "temperature": 27.2, "humidity": 54, "wind_speed": 6.2, "precipitation": 0.0 },
    { "hour": "14:00", "temperature": 28.1, "humidity": 52, "wind_speed": 6.3, "precipitation": 0.0 },
    { "hour": "15:00", "temperature": 29.2, "humidity": 50, "wind_speed": 6.4, "precipitation": 0.0 },
    { "hour": "16:00", "temperature": 28.8, "humidity": 51, "wind_speed": 6.2, "precipitation": 0.0 },
    { "hour": "17:00", "temperature": 27.9, "humidity": 53, "wind_speed": 6.0, "precipitation": 0.0 },
    { "hour": "18:00", "temperature": 26.9, "humidity": 55, "wind_speed": 5.8, "precipitation": 0.2 },
    { "hour": "19:00", "temperature": 25.7, "humidity": 58, "wind_speed": 5.6, "precipitation": 0.3 },
    { "hour": "20:00", "temperature": 24.6, "humidity": 60, "wind_speed": 5.4, "precipitation": 0.1 },
    { "hour": "21:00", "temperature": 23.5, "humidity": 62, "wind_speed": 5.2, "precipitation": 0.0 },
    { "hour": "22:00", "temperature": 22.8, "humidity": 64, "wind_speed": 5.0, "precipitation": 0.0 },
    { "hour": "23:00", "temperature": 22.0, "humidity": 66, "wind_speed": 4.8, "precipitation": 0.0 }
]


const chartConfig = chartDatas.data.map((item) => {
    return {
        date: item.date,
        color: `hsl(var(--chart-${item.date}))`
    }
}) satisfies ChartConfig

export function Component() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("date")


  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Weather Report - Interactive Charts</CardTitle>
          <CardDescription>
            Showing total Report for the last 3 Days
          </CardDescription>
        </div>
        <div className="flex">
            {
                chartDatas.data.map((item) => {
                    const chart = item.date as keyof typeof chartConfig
                    return (
                        <button data-active={activeChart === chart} key={item.date} className="flex flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                            <span className="text-xs text-muted-foreground">
                               Date
                            </span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                            {item.date}
                            </span>
                        </button>
                    )
                })
            }
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
