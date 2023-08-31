import { Table } from "antd";
import CustomButton from "../../components/button";
import Layout from "../../components/layout";
import { Employee } from "@prisma/client";

import { PlusCircleOutlined } from "@ant-design/icons";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { Path } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

const columns: ColumnsType<Employee> = [
  {
    title: "I`мя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Вiк",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адреса",
    dataIndex: "address",
    key: "address",
  },
];

const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const goToAddUser = () => navigate(Path.employeeAdd)

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={ goToAddUser }
        icon={<PlusCircleOutlined />}
      >
        Додати
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Path.employee}/${record.id}`),
          };
        }}
      ></Table>
    </Layout>
  );
};

export default Employees;
