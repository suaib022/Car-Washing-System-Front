import React, { useEffect, useState } from "react";
import UseForm from "../../form/Form";
import { Button, Row } from "antd";
import FormInput from "../../form/Input";
import UseSelect from "../../form/Select";
import { useGetAllServicesQuery } from "../../../redux/features/service/serviceApi";
import { useNavigate } from "react-router-dom";

const Compare = () => {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  const navigate = useNavigate();

  const { data: allServices } = useGetAllServicesQuery({ limit: 50000 });

  const serviceOptions = allServices?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const onSubmit = async (data) => {
    const service1 = selectedOption1;
    const service2 = selectedOption2;

    if (service1 === "" || service2 === "") return;
    navigate(`/services/${service1}/${service2}`);
  };

  return (
    <div className=" w-5/6 mx-auto mt-20">
      <div className="border rounded-xl pb-6">
        <h2 className="text-4xl mt-6 mb-6  font-bold text-center text-white">
          Compare Services
          <Row
            className="h-4/5 mt-6"
            justify="center"
            align="middle"
            style={{}}
          >
            <div className=" w-3/5">
              <UseForm onSubmit={onSubmit}>
                <div className="space-y-2  flex flex-col font-semibold">
                  <UseSelect
                    setSelectedOption={setSelectedOption1}
                    options={serviceOptions}
                    name="service1"
                    label="Service"
                  />
                  <UseSelect
                    setSelectedOption={setSelectedOption2}
                    options={serviceOptions}
                    name="service2"
                    label="Service"
                  />
                  <Button
                    style={{
                      backgroundColor: "#e11d48",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: "0",
                      font: "inherit",
                      width: "100%",
                      marginTop: "40px",
                    }}
                    htmlType="submit"
                    className=""
                  >
                    Compare
                  </Button>
                </div>
              </UseForm>
            </div>
          </Row>
        </h2>
      </div>
    </div>
  );
};

export default Compare;
