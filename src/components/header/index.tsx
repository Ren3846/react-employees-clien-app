import { Layout, Space, Typography } from "antd";
import { TeamOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import CustomButton from "../button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Path.home}>
          <Typography.Title level={1}>Співробітники</Typography.Title>
        </Link>
      </Space>

      <Space className={styles.rightButtons}>
        {user ? (
          <CustomButton
            type="text"
            icon={<LoginOutlined />}
            onClick={onLogoutClick}
          >
            {" "}
            Вийти
          </CustomButton>
        ) : (
          <Link to={Path.login}>
            <CustomButton type="text" icon={<LoginOutlined />}>
              {" "}
              Вхід{" "}
            </CustomButton>
          </Link>
        )}

        <Link to={Path.register}>
          <CustomButton type="text" icon={<UserOutlined />}>
            {" "}
            Реєстрація{" "}
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};

export default Header;
