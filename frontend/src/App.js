import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate  } from "react-router-dom";
import { MasterLayout } from "./Modules/Pages/MasterLayout";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/*" element={<MasterLayout />} />
          {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
