import { useState } from "react";
import { CheckboxGroup, Checkbox } from "@heroui/react";

export default function CateSelect() {
  const categories = [
    { label: "全選", value: "all" },
    { label: "花藝植栽", value: "flower" },
    { label: "縫紉布藝", value: "sewing" },
    { label: "食尚飲品", value: "food" },
    { label: "身心靈", value: "wellness" },
    { label: "音樂舞蹈", value: "music" },
    { label: "講座分享", value: "lecture" },
    { label: "藝術繪畫", value: "art" },
    { label: "運動健身", value: "fitness" },
  ];

// 預設除全選，其他都選中
  const [selected, setSelected] = useState(categories.slice(1).map(item => item.value)); 

// 確認是否所有選項都被選取
  const isAllSelected = selected.length === categories.length - 1; 

// 如選全選，就勾選全部（排除全選這個選項），否則取消全選
  const handleChange = (values) => {
    if (values.includes("all")) {
      setSelected(isAllSelected ? [] : categories.slice(1).map(item => item.value));
    } else {
      setSelected(values);
    }
  };

// 展示畫面
  return (
    <CheckboxGroup value={selected} onChange={handleChange}>
      {categories.map((item, index) => (
        <Checkbox key={item.value} value={item.value} color="default" className="py-3">
          {item.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}