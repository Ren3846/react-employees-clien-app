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
        <Card title="Вхід" style={{width: '30rem'}}>
          <Form onFinish={() => null}>
            <CustomInput type="email" name="email" placeholder="Email"/>
            <CustomPassword name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">Увійти</CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Немає акаунту? <Link to={Path.register}>Зареєструйтесь!</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
