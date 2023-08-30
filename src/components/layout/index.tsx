import { Layout as AntLayout } from "antd";
import styles from "./index.module.css";
import Header from "../header";

import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (

    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: "100%" }}>
        {children}
      </AntLayout.Content>

      <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ right: 24 }} />

      
    </div>
  );
};

export default Layout;
