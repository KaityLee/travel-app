import React, { useEffect, useState } from "react";
import { Calendar, Select, Row, Col, notification } from "antd";
import axios from "axios";

const fetchCurrencyRate = async () => {
  try {
    const response = await axios.get(
      "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=JPY&u4=KRW&u8=down&u2=1"
      ); 
    const currencyData = response.data.country; 

    const krwRate = currencyData.find((item) => item.currencyUnit === "원")?.value || "N/A";
    
    return parseFloat(krwRate).toFixed(2); 
  } catch (error) {
    console.error("Error fetching currency rate:", error);
    return "N/A";
  }
};

const NoticeCalendar = () => {
  const [currencyRate, setCurrencyRate] = useState("Loading...");
  const [previousRate, setPreviousRate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const updateRate = async () => {
      const newRate = await fetchCurrencyRate();
      
      if (previousRate && newRate !== previousRate) {
        notification.success({
          message: "Currency Rate Updated",
          description: `New JPY → KRW Rate: ${newRate}`,
          duration: 3, 
        });

        // 하이라이트 효과
        setIsUpdated(true);
        setTimeout(() => setIsUpdated(false), 3000); 
      }

      setPreviousRate(newRate);
      setCurrencyRate(newRate);
    };

    updateRate(); // 바로 받기기
    const interval = setInterval(updateRate, 60000); 

    return () => clearInterval(interval); 
  }, [previousRate]); 

  const customHeader = ({ value, onChange }) => {
    const year = value.year();
    const month = value.month();

    return (
      <Row justify="space-between" align="middle" style={{ padding: "10px 20px" }}>
        {/* 년월 표시 */}
        <Col>
          <h3>{value.format("YYYY년 MM월")}</h3>
        </Col>

        {/* 년/월 선택창 */}
        <Col style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Select
            value={year}
            onChange={(newYear) => {
              const newValue = value.clone().year(newYear);
              onChange(newValue);
            }}
            style={{ width: 100 }}
          >
            {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
              <Select.Option key={y} value={y}>
                {y}년
              </Select.Option>
            ))}
          </Select>

          <Select
            value={month}
            onChange={(newMonth) => {
              const newValue = value.clone().month(newMonth);
              onChange(newValue);
            }}
            style={{ width: 100 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Select.Option key={i} value={i}>
                {i + 1}월
              </Select.Option>
            ))}
          </Select>

          {/* 환율 */}
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              transition: "color 0.5s ease",
              color: isUpdated ? "red" : "#1890ff",
            }}
          >
            JPY → KRW: {currencyRate}
          </span>
        </Col>
      </Row>
    );
  };

  return <Calendar headerRender={customHeader} />;
};


export default NoticeCalendar;
