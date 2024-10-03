/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { Select } from "antd";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import img from "../../assets/images/Result/no-data-found.jpg";
import errorImg from "../../assets/images/Result/error-404.png";
import ServiceCard from "./ServiceCard";
import Filter from "../../components/Service/Filter";
import FilterDrawer from "../../components/Service/FilterDrawer";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";

const Product = () => {
  const [category, setCategory] = useState([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [open, setOpen] = useState(false);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByPriceValue, setSortByPriceValue] = useState("default");
  const [isInitialized, setIsInitialized] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfServices, setNumberOfServices] = useState(500);
  const [limitOptions, setLimitOptions] = useState([
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ]);

  // Debouncing the search term to reduce the number of API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 2500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // get all the services in DB
  const {
    data: allServices,
    isFetching: isAllServicesLoading,
    isError: isAllServicesError,
  } = useGetAllServicesQuery({ limit: 50000 });

  // get the filtered services
  const {
    data: services,
    isError,
    isFetching,
  } = useGetAllServicesQuery({
    searchTerm: debouncedSearchTerm,
    sort: sortByPrice,
    limit: limit,
    page: page,
    ...(checkedList?.length > 0 && { category: category }),
  });

  // get the filtered Services without limit
  const {
    data: servicesWithoutLimit,
    isFetching: isServicesWithOutLimitLoading,
    isError: isServicesWithOutLimitError,
  } = useGetAllServicesQuery({
    limit: 50000,
    searchTerm: debouncedSearchTerm,
    sort: sortByPrice,
    ...(checkedList?.length > 0 && { category: category }),
  });

  // handle numberOfServices state for pagination
  useEffect(() => {
    if (servicesWithoutLimit?.data) {
      setNumberOfServices(servicesWithoutLimit.data.length);
    }
  }, [servicesWithoutLimit]);

  // handle sorting filter
  useEffect(() => {
    if (sortByPrice === "default") {
      setSortByPrice("");
      setSortByPriceValue("default");
    }
  }, [sortByPrice]);

  const handleChange = (value: string) => {
    setSortByPrice(value);
    setSortByPriceValue(value);
  };

  // handle filter drawer
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // handle page and limit for pagination
  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setLimit(pageSize);
  };

  const onShowSizeChange = (_current: number, size: number) => {
    setLimit(size);
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);

    setLimitOptions((prevOptions) => {
      const otherOptions = prevOptions.filter((opt) => opt.value !== value);
      return [{ value, label: `${value}` }, ...otherOptions];
    });
  };

  if (isFetching || isAllServicesLoading || isServicesWithOutLimitLoading) {
    return (
      <span className="loading loading-dots flex my-32 mx-auto loading-lg"></span>
    );
  }

  // handle search

  const { Search } = Input;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-6">
      <div className="lg:flex lg:gap-12">
        <div className="lg:w-1/4 hidden lg:block">
          <Filter
            isInitialized={isInitialized}
            setIsInitialized={setIsInitialized}
            setSortByPrice={setSortByPrice}
            setCategory={setCategory}
            allProducts={allServices}
            sortByPrice={sortByPrice}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
        <div className="lg:w-3/4">
          <div
            style={{ width: "97%" }}
            className="items-center mx-auto bg-transparent border grid sm:grid-cols-2 md:grid-cols-4 md:gap-4 lg:grid-cols-3 grid-cols-1 mb-4 justify-center px-4 py-4 rounded-lg shadow-md space-y-2"
          >
            <div className=" flex justify-center ">
              <Space direction="vertical">
                <Search
                  className="w-full text-white"
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onChange={onSearchChange}
                />
              </Space>
            </div>
            <div className="text-md text-white font-semibold flex justify-center gap-5 items-center ">
              Show
              <Space wrap>
                <Select
                  value={limit}
                  onChange={handleLimitChange}
                  style={{ width: 120 }}
                  options={limitOptions}
                />
              </Space>
            </div>
            <div className="lg:hidden flex sm:justify-start md:justify-center justify-center items-center">
              <FilterDrawer
                isInitialized={isInitialized}
                setIsInitialized={setIsInitialized}
                setCategory={setCategory}
                allProducts={allServices}
                sortByPrice={sortByPrice}
                setSortByPrice={setSortByPrice}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                open={open}
                onClose={onClose}
                showDrawer={showDrawer}
              />
            </div>
            <div className=" flex justify-center items-center text-md font-semibold gap-2 text-white">
              Sort By
              <Space wrap>
                <Select
                  onChange={handleChange}
                  value={sortByPriceValue}
                  style={{ width: 120 }}
                  options={[
                    { value: "default", label: "Default" },
                    { value: "price", label: "Price (Low > High)" },
                    { value: "-price", label: "Price (High > Low)" },
                    { value: "duration", label: "Duration (Low > High)" },
                    { value: "-duration", label: "Duration (High > Low)" },
                  ]}
                />
              </Space>
            </div>
          </div>
          {(() => {
            if (services?.data?.length === 0) {
              return (
                <div>
                  <img src={img} alt="" />
                </div>
              );
            } else if (
              isError ||
              isAllServicesError ||
              isServicesWithOutLimitError
            ) {
              return (
                <img className="h-[450px] mx-auto" src={errorImg} alt="" />
              );
            } else {
              return (
                <div>
                  <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 px-4 py-4 rounded-lg shadow-lg">
                    {services.data.map((service: any) => (
                      <ServiceCard
                        service={service}
                        key={service._id}
                      ></ServiceCard>
                    ))}
                  </div>
                  <div
                    style={{ width: "97%" }}
                    className="my-6 border shadow-xl rounded-md px-4 mx-auto py-4"
                  >
                    <Pagination
                      showQuickJumper
                      current={page}
                      pageSize={limit}
                      total={numberOfServices}
                      onChange={onChange}
                      showSizeChanger
                      onShowSizeChange={onShowSizeChange}
                    />
                  </div>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Product;
