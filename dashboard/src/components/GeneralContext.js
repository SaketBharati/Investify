import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [notice, setNotice] = useState(null);
  

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };
  
  const handleOpenSellWindow = (uid) => {
  setIsSellWindowOpen(true);
  setSelectedStockUID(uid);
};

const handleCloseSellWindow = () => {
  setIsSellWindowOpen(false);
  setSelectedStockUID("");
};

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        refreshDashboard: () => setRefreshKey((key) => key + 1),
        refreshKey,
        notify: (message, type = "success") => setNotice({ message, type }),
      }}
    >
      {props.children}
      {notice && <div className={`alert alert-${notice.type} position-fixed top-0 end-0 m-3`} role="status" style={{ zIndex: 2000 }}>
        {notice.message}
        <button type="button" className="btn-close ms-3" aria-label="Dismiss" onClick={() => setNotice(null)} />
      </div>}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
