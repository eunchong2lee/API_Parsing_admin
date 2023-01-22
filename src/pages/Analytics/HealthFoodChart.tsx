import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const HealthFoodChart = (props: any) => {
  const [option, setOption] = useState<any>({});
  const [series, setSeries] = useState<any>([]);

  useEffect(() => {
    settingOption(props.date);
    console.log(props.data);
  }, [props.date]);

  const settingOption = (date: string) => {
    console.log("실행");
    let options;
    let series;
    if (date === "연도별") {
      const props_data = props.data.year;

      const categories: any[] = [];
      const data: any[] = [];
      for (let i = props_data.length; i > 0; i--) {
        categories.push(props_data[i - 1].date);
        data.push(props_data[i - 1].cnt);
      }
      options = {
        chart: {
          id: "area-datetime",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 4,
            opacity: 0.075,
          },
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
          },
        },

        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 3,
          strokeWidth: 3,

          hover: {
            size: 6,
          },
        },
        stroke: {
          show: true,
          // curve: "smooth",
          width: 3,
          dashArray: 0,
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        colors: ["#038edc"],
        fill: {
          opacity: 0.05,
          colors: ["#038edc"],
          type: "solid",
        },
      };
      series = [
        {
          name: "총 등록 건강식품",
          data: data,
        },
      ];
    } else if (date === "월별") {
      const props_data = props.data.month;

      const categories: any[] = [];
      const data: any[] = [];
      for (let i = props_data.length; i > 0; i--) {
        const props_date = `${props_data[i - 1].date}`;
        const year = props_date.substr(0, 4);
        const month = props_date.substr(4, props_date.length);
        categories.push(`${year}-${month}`);
        data.push(props_data[i - 1].cnt);
      }
      options = {
        chart: {
          id: "area-datetime",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 4,
            opacity: 0.075,
          },
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
          },
        },

        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 3,
          strokeWidth: 3,

          hover: {
            size: 6,
          },
        },
        stroke: {
          show: true,
          // curve: "smooth",
          width: 3,
          dashArray: 0,
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        colors: ["#038edc"],
        fill: {
          opacity: 0.05,
          colors: ["#038edc"],
          type: "solid",
        },
      };
      series = [
        {
          name: "총 등록 건강식품",
          data: data,
        },
      ];
    } else if (date === "요일별") {
      const props_data = props.data.day;

      const categories: any[] = [];
      const data: any[] = [];
      for (let i = props_data.length; i > 0; i--) {
        const props_date = `${props_data[i - 1].date}`;
        const year = props_date.substr(0, 4);
        const month = props_date.substr(4, 2);
        const day = props_date.substr(6, props_date.length);
        categories.push(`${year}-${month}-${day}`);
        console.log(year, month, day);
        data.push(props_data[i - 1].cnt);
      }
      options = {
        chart: {
          id: "area-datetime",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 4,
            opacity: 0.075,
          },
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
          },
        },

        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 3,
          strokeWidth: 3,

          hover: {
            size: 6,
          },
        },
        stroke: {
          show: true,
          // curve: "smooth",
          width: 3,
          dashArray: 0,
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        colors: ["#038edc"],
        fill: {
          opacity: 0.05,
          colors: ["#038edc"],
          type: "solid",
        },
      };
      series = [
        {
          name: "총 등록 건강식품",
          data: data,
        },
      ];
    }

    setSeries(series);
    setOption(options);
  };

  return (
    <React.Fragment>
      <ReactApexChart
        options={option}
        series={series}
        type="area"
        height={440}
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default HealthFoodChart;
