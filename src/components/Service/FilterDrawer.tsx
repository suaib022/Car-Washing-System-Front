/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Drawer, Checkbox, Divider } from "antd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../ui/button";

const CheckboxGroup = Checkbox.Group;

const categories = [
  { value: "ExteriorWash", label: "Exterior Wash" },
  { value: "InteriorCleaning", label: "Interior Cleaning" },
  { value: "FullDetailing", label: "Full Detailing" },
  { value: "ExpressWash", label: "Express Wash" },
  { value: "EngineCleaning", label: "Engine Cleaning" },
  { value: "WaxingPolishing", label: "Waxing & Polishing" },
  { value: "Vacuuming", label: "Vacuuming" },
  { value: "CeramicCoating", label: "Ceramic Coating" },
  { value: "PaintProtection", label: "Paint Protection" },
  { value: "WindowCleaning", label: "Window Cleaning" },
  { value: "SUVTruckWash", label: "SUV/Truck Wash" },
  { value: "LuxuryVehicleDetailing", label: "Luxury Vehicle Detailing" },
];

const FilterDrawer = ({
  open,
  showDrawer,
  onClose,
  range,
  setRange,
  checkedList,
  setCheckedList,
  sortByPrice,
  allProducts,
  setCategory,
  setSortByPrice,
  isInitialized,
  setIsInitialized,
}: any) => {
  const [accordionValue, setAccordionValue] = useState("item");
  const [showClearFilterButton, setShowClearFilterButton] = useState(false);

  const checkAll = categories.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < categories.length;

  // handle price range state
  useEffect(() => {
    if (allProducts?.data && !isInitialized) {
      setIsInitialized(true);
    }
  }, [allProducts, range, setRange, isInitialized, setIsInitialized]);

  // handle category selection
  const onCheckAllChange = (e: any) => {
    const allValues = e.target.checked
      ? categories.map((item) => item.value)
      : [];
    setCheckedList(allValues);
    setCategory(allValues);
  };

  const onChange = (list: any) => {
    setCheckedList(list);
    setCategory(list);
  };

  // handle showClearFilter button state
  useEffect(() => {
    if (checkedList.length > 0 || sortByPrice !== "") {
      setShowClearFilterButton(true);
    } else {
      setShowClearFilterButton(false);
    }
  }, [checkedList, range, sortByPrice]);

  // handle clear filter button
  const handleClearFilter = () => {
    setCheckedList([]);
    setSortByPrice("default");
  };

  return (
    <>
      <Button
        className="sm:w-2/4 w-2/5 bg-rose-500 hover:bg-rose-600"
        onClick={showDrawer}
      >
        Filter
      </Button>
      <div>
        <Drawer
          className="rounded-xl"
          title="Filter Options"
          onClose={onClose}
          open={open}
          style={{ backgroundColor: "#042f2e", color: "white" }}
        >
          <div className="justify-end flex ">
            {showClearFilterButton ? (
              <Button onClick={handleClearFilter} className="bg-red-600">
                Clear Filter
              </Button>
            ) : (
              ""
            )}
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={accordionValue}
            onValueChange={setAccordionValue}
          >
            <AccordionItem value="item">
              <AccordionTrigger>
                <h2 className="text-xl font-semibold mt-12 mb-4">Category :</h2>
              </AccordionTrigger>
              <AccordionContent>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  <p className="font-medium text-white">Select all</p>
                </Checkbox>
                <Divider />
                <CheckboxGroup
                  className="flex flex-col gap-3 font-semibold"
                  options={categories.map((category) => ({
                    label: (
                      <span style={{ color: "white" }}>{category.label}</span>
                    ),
                    value: category.value,
                  }))}
                  value={checkedList}
                  onChange={onChange}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Drawer>
      </div>
    </>
  );
};

export default FilterDrawer;
