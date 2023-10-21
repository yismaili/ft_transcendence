"use client"
import "@/global_css/resets.css";
import "@/global_css/utilityClasses.css";
import "./history.css";

type props = {
  isDisplay: boolean;
};

function History({ isDisplay }: props) {
    return (
        <div className={`history ${!isDisplay ? "show__history" : "noshow__history"}`} >
      <h3 className="history__title">history</h3>
    </div>
  );
}

export default History;
