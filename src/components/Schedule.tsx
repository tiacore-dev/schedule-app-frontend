import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DataType {
  id: string;
  method: string;
  url: string;
  schedule_type: string;
  data: string;
  last_run: string;
  is_active: boolean;
  interval: number;
  time_of_day: string;
}

export const Schedule = () => {
  const [data, setData] = useState<DataType | undefined>(undefined);
  const { id } = useParams();
  const token = localStorage.getItem("access_token");

  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.schedule.tiacore.com/schedule/${id}/view`,
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
        // console.error("Ошибка сети:", data);
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

  return data ? (
    <div>
      <div>id: {data.id}</div>
      <div>method: {data.method}</div>
      <div>url: {data.url}</div>
      <div>schedule_type: {data.schedule_type}</div>
      <div>data: {JSON.stringify(data.data)}</div>
      <div>last_run: {data.last_run}</div>
      <div>is_active: {data.is_active}</div>
      <div>interval: {data.interval}</div>
      <div>time_of_day: {data.time_of_day}</div>
    </div>
  ) : null;
};
