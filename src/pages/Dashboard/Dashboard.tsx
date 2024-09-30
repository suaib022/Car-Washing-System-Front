import { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { FaBook, FaServicestack } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { FaRecycle } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentToken } from "../../redux/features/auth/authSlice";
import { TUser, verifyToken } from "../../utils/verifyToken";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // Null for no selection

  let user;
  const token = useAppSelector(getCurrentToken);
  if (token) {
    user = verifyToken(token as any) as TUser;
  }

  const navigate = useNavigate();
  const location = useLocation();

  // Update selected menu item based on the current route
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setSelectedKey(null); // No key selected on the main dashboard path
    } else if (location.pathname.includes("my-profile")) {
      setSelectedKey("1");
    } else if (location.pathname.includes("my-bookings")) {
      setSelectedKey("2");
    } else if (location.pathname.includes("userManagement")) {
      setSelectedKey("3");
    } else if (location.pathname.includes("serviceManagement")) {
      setSelectedKey("4");
    } else if (location.pathname.includes("slotManagement")) {
      setSelectedKey("5");
    } else if (location.pathname.includes("booking-management")) {
      setSelectedKey("6");
    } else if (location.pathname.includes("trashManagement")) {
      setSelectedKey("7");
    }
  }, [location.pathname]);

  const menuItems = [
    {
      key: "1",
      icon: <CgProfile />,
      label: "My Profile",
      onClick: () => {
        navigate("/dashboard/my-profile");
      },
    },

    ...(user?.role === "user"
      ? [
          {
            key: "2",
            icon: <FaRegBookmark />,
            label: "My Bookings",
            onClick: () => {
              navigate("/dashboard/my-bookings");
            },
          },
        ]
      : []),
    ...(user?.role === "admin"
      ? [
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
        ]
      : []),
  ];

  const DefaultDashboardContent = () => {
    return (
      <div className="h-[50vh]">
        <h1 className="text-center text-5xl font-semibold">
          Welcome to the Dashboard!
        </h1>
        <p className="text-center mt-6 text-xl font-semibold">
          Please select an option from the sidebar to see your desired content
        </p>
      </div>
    );
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []} // Set selected key dynamically
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            color: "white",
          }}
          theme="dark"
          className="flex"
        >
          <Button
            className="w-1/6"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
          <div className="w-5/6 text-3xl my-auto font-semibold text-center">
            Admin Dashboard
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {selectedKey === null ? <DefaultDashboardContent /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
