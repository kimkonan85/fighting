import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface IConinID {
  coinId: string;
}
function Chart() {
    const {coinId} = useOutletContext<IConinID>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );
    return (
        <div>
          {isLoading ? (
            "Loading chart..."
          ) : (
            <ReactApexChart
                type="candlestick"
                series={[
                    {
                        data: 
                            data?.map((price) => ({
                                x: Number(price.time_close),
                                y:[Number(price.open), Number(price.high), Number(price.low), Number(price.close)],
                            })) ?? [],
                    },
                ]}
                options={{
                    theme: {
                        mode: "dark",
                    },
                    chart: {
                        type: "candlestick",
                        height: 350,
                        width: 500,
                        toolbar: {
                            show:false,
                        },
                        background: "transparent",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 2,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        type: "datetime",
                        categories: data?.map((price) => Number(price.time_close)),
                        labels: {
                            style: {
                                colors: '#9c88ff'
                            }
                        }
                    },
                    plotOptions: {
                        candlestick: {
                            colors: {
                                upward: '#3C90EB',
                                downward: '#DF7D46'
                            }
                        }
                    }
                }}
            />
          )}
        </div>
      );
}
    


export default Chart;