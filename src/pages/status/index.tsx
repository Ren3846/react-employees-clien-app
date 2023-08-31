import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Користувача успішно створено",
  updated: "Користувача успішно оновлено",
  deleted: "Користувача успішно видалено",
};

const Status = () => {
  const { status } = useParams();
  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : "Не знайдено"}
        extra={
          <Button key="dashboard">
            <Link to="/employees">
              На головну
            </Link>
          </Button>
        }
      />
    </Row>
  );
};

export default Status;
