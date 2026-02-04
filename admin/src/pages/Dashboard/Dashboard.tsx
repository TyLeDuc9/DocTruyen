import { Card, Col, Row, Statistic, Spin, Alert } from "antd";
import { Line, Column } from "@ant-design/plots";
import type { TopViewedStory } from "../../types/dashboardType";
import {
  UserOutlined,
  BookOutlined,
  ReadOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { useGetDashboardOverview } from "../../hooks/usegetDashboardOverview";
import { useGetUserRegisterByDate } from "../../hooks/usegetUserRegisterByDate";
import { useGetTopViewedStory } from "../../hooks/useGetTopViewedStory";

export const Dashboard = () => {
  const {
    data: topStories,
    loading: topLoading,
    error: topError,
  } = useGetTopViewedStory(10);
  const { data: overview, loading, error } = useGetDashboardOverview();

  const { data: registerData, loading: registerLoading } =
    useGetUserRegisterByDate(30);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spin size="large" />
      </div>
    );

  if (error)
    return <Alert type="error" message="Lỗi" description={error} showIcon />;

  return (
    <div>
      {/* OVERVIEW */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Users"
              value={overview?.totalUsers ?? 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Stories"
              value={overview?.totalStories ?? 0}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Chapters"
              value={overview?.totalChapters ?? 0}
              prefix={<ReadOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Views"
              value={overview?.totalViews ?? 0}
              prefix={<EyeOutlined />}
              formatter={(v) => v.toLocaleString()}
            />
          </Card>
        </Col>
      </Row>

      {/* USER REGISTER CHART */}
      <Row className="mt-6">
        <Col span={24}>
          <Card title="User đăng ký theo 30 ngày">
            {registerLoading ? (
              <Spin />
            ) : (
              <Line data={registerData} xField="date" yField="total" smooth />
            )}
          </Card>
        </Col>
      </Row>
        <Row className="mt-6">
          <Col span={24}>
            <Card title="Top truyện xem nhiều nhất tuần">
              {topLoading ? (
                <Spin />
              ) : topError ? (
                <Alert type="error" message={topError} />
              ) : (
                <Column
                  data={topStories}
                  xField="name"
                  yField="views"
                  colorField="name"
                  label={{
                    position: "top",
                    formatter: (v: { views: number }) => v.views.toLocaleString(),
                  }}
                  tooltip={{
                    formatter: (datum: TopViewedStory) => ({
                      name: datum.name,
                      value: `${datum.views.toLocaleString()} lượt xem`,
                    }),
                  }}
                  xAxis={{
                    label: {
                      autoRotate: false,
                    },
                  }}
                />
              )}
            </Card>
          </Col>
        </Row>
    </div>
  );
};
