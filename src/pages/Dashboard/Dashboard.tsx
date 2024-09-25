import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { FaBook, FaServicestack } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { FaRecycle } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <CgProfile />,
              label: "My Profile",
              onClick: () => {
                navigate("/dashboard/my-profile");
              },
            },
            {
              key: "2",
              icon: <FaRegBookmark />,
              label: "My Bookings",
              onClick: () => {
                navigate("/dashboard/my-bookings");
              },
            },
            {
              key: "3",
              icon: <FiUsers />,
              label: "User Management",
              onClick: () => {
                navigate("/dashboard/userManagement");
              },
            },
            {
              key: "4",
              icon: <FaServicestack />,
              label: "Service Management",
              onClick: () => {
                navigate("/dashboard/serviceManagement");
              },
            },
            {
              key: "5",
              icon: <CiTimer />,
              label: "Slot Management",
              onClick: () => {
                navigate("/dashboard/slotManagement/manageSlots");
              },
            },
            {
              key: "6",
              icon: <FaBook />,
              label: "Booking Management",
              onClick: () => {
                navigate("/dashboard/booking-management");
              },
            },
            {
              key: "7",
              icon: <FaRecycle />,
              label: "Recycle Bin",
              onClick: () => {
                navigate("/dashboard/trashManagement");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex"
        >
          <Button
            className="w-1/6 "
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="w-5/6  text-3xl my-auto font-semibold  text-center">
            Admin Dashboard
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
