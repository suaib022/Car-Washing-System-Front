/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { Select } from "antd";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import img from "../../assets/images/Result/no-data-found.png";
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
  const [numberOfProducts, setNumberOfProducts] = useState(500);
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

  // get all the products in DB
  const {
    data: allProducts,
    isLoading: isAllProductsLoading,
    isError: isAllProductsError,
  } = useGetAllServicesQuery({ limit: 50000 });

  // get the filtered products
  const {
    data: products,
    isError,
    isLoading,
  } = useGetAllServicesQuery({
    searchTerm: debouncedSearchTerm,
    sort: sortByPrice,
    limit: limit,
    page: page,
    ...(checkedList?.length > 0 && { category: category }),
  });

  // console.log({ debouncedSearchTerm, sortByPrice, limit });

  // get the filtered products without limit
  const {
    data: productsWithoutLimit,
    isLoading: isProductsWithOutLimitLoading,
    isError: isProductsWithOutLimitError,
  } = useGetAllServicesQuery({
    limit: 50000,
    searchTerm: debouncedSearchTerm,
    sort: sortByPrice,
    ...(checkedList?.length > 0 && { category: category }),
  });

  // handle numberOfProducts state for pagination
  useEffect(() => {
    if (productsWithoutLimit?.data) {
      setNumberOfProducts(productsWithoutLimit.data.length);
    }
  }, [productsWithoutLimit]);

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

  if (isLoading || isAllProductsLoading || isProductsWithOutLimitLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin
          className="fixed inset-0 flex items-center justify-center"
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
        />
      </Flex>
    );
  }

  // handle search

  const { Search } = Input;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="lg:flex lg:gap-12">
        <div className="lg:w-1/4 hidden lg:block">
          <Filter
            isInitialized={isInitialized}
            setIsInitialized={setIsInitialized}
            setSortByPrice={setSortByPrice}
            setCategory={setCategory}
            allProducts={allProducts}
            sortByPrice={sortByPrice}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
          />
        </div>
        <div className="lg:w-3/4">
          <div className="items-center bg-teal-950 grid sm:grid-cols-2 md:grid-cols-4 md:gap-4 lg:grid-cols-3 grid-cols-1 mb-4 justify-center px-4 py-4 rounded-lg shadow-md space-y-2">
            <div className=" flex justify-center ">
              <Space direction="vertical">
                <Search
                  className="w-full"
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onChange={onSearchChange}
                />
              </Space>
            </div>
            <div className="text-md font-semibold flex justify-center gap-5 items-center ">
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
                allProducts={allProducts}
                sortByPrice={sortByPrice}
                setSortByPrice={setSortByPrice}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                open={open}
                onClose={onClose}
                showDrawer={showDrawer}
              />
            </div>
            <div className=" flex justify-center items-center text-md font-semibold gap-2">
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
            if (products?.data?.length === 0) {
              return (
                <div>
                  <img src={img} alt="" />
                </div>
              );
            } else if (
              isError ||
              isAllProductsError ||
              isProductsWithOutLimitError
            ) {
              return (
                <img className="h-[450px] mx-auto" src={errorImg} alt="" />
              );
            } else {
              return (
                <div>
                  <div className="grid gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 px-4 py-4 rounded-lg shadow-lg">
                    {products.data.map((product: any) => (
                      <ServiceCard
                        product={product}
                        key={product._id}
                      ></ServiceCard>
                    ))}
                  </div>
                  <div className="mt-6  shadow-xl rounded-md px-4 py-4">
                    <Pagination
                      showQuickJumper
                      current={page}
                      pageSize={limit}
                      total={numberOfProducts}
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
