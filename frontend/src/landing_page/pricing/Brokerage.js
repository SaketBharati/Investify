import React, { useState } from "react";
import EquityTable from "./EquityTable";
import CurrencyTable from "./CurrencyTable";
import CommodityTable from "./CommodityTable";

function Brokerage() {
  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="container mt-5">
      {/* Tabs */}
      <div className="d-flex gap-5 border-bottom pb-2">
        <h2
          style={{ cursor: "pointer", marginLeft:"60px" }}
          className={activeTab === "equity" ? "text-dark" : "text-primary"}
          onClick={() => setActiveTab("equity")}
        >
          Equity
        </h2>

        <h2
          style={{ cursor: "pointer" }}
          className={activeTab === "currency" ? "text-dark" : "text-primary"}
          onClick={() => setActiveTab("currency")}
        >
          Currency
        </h2>

        <h2
          style={{ cursor: "pointer" }}
          className={activeTab === "commodity" ? "text-dark" : "text-primary"}
          onClick={() => setActiveTab("commodity")}
        >
          Commodity
        </h2>
      </div>

      {activeTab === "equity" && <EquityTable />}
      {activeTab === "currency" && <CurrencyTable />}
      {activeTab === "commodity" && <CommodityTable />}
    </div>
  );
}

export default Brokerage;