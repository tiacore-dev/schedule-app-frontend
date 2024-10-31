import { Table } from "antd";
import type { TableProps } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DataType {
  id: string;
  method: string;
  url: string;
  schedule_type: string;
  // data: {},
  last_run: string;
  is_active: boolean;
  interval: number;
  time_of_day: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "method",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "url",
    dataIndex: "url",
    key: "url",
  },
];

export const Home: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const getData = async () => {
    try {
      const response = await fetch(
        "https://api.schedule.tiacore.com/schedules/",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setData(data);
      } else {
        // Обработка ошибки авторизации
        console.error("Ошибка получения данных");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <Table<DataType>
      rowKey="id"
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/schedules/${record.id}`);
          }, // click row
        };
      }}
      columns={columns}
      dataSource={data}
    />
  );
};
