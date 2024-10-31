import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  type FieldType = {
    username?: string;
    password?: string;
  };

  const onFinish = async () => {
    try {
      const response = await fetch("https://api.schedule.tiacore.com/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { access_token, refresh_token } = data;
        // Сохранение токенов
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        // Перенаправление на главную страницу
        navigate("/");
      } else {
        // Обработка ошибки авторизации
        console.error("Ошибка авторизации");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      // autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Имя пользователя"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
