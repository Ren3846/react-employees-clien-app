import { Row, Card, Form, Space, Typography } from "antd";
import Layout from "../../components/layout";
import CustomInput from "../../components/input";
import CustomPassword from "../../components/password-input";
import CustomButton from "../../components/button";
import { Path } from "../../paths";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Реєстрація" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput name="name" placeholder="Ім'я" />
            <CustomInput name="secondName" placeholder="Прізвіще" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <CustomPassword name="password" placeholder="Пароль" />
            <CustomPassword
              name="confirmPassword"
              placeholder="Повтoрiть пароль"
            />
            <CustomButton type="primary" htmlType="submit">
              Зареєструватись
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Вже зареєстровані? <Link to={Path.login}>Увійдіть!</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
