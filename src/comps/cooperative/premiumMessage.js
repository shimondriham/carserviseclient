import React, { useEffect, useState } from "react";
import "../css/message.css";
import { FaMap } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PremiumMessage(props) {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 3000);
  }, []);

  const closeMsg = () => {
    let message = document.querySelector(".message");
    message.style.display = "none";
  };

  return (
    <div>
      {flag ? (
        <div className="message" style={{ minWidth: "50vh" }}>
          <div>
            <h1>
              <span style={{ fontSize: "3vh", padding: "8px" }}>
                <FaMap />
              </span>
              ------------
              <span style={{ fontSize: "3vh", padding: "8px" }}>
                <FaMap />
              </span>
            </h1>
              <div className="link-premium">
            <Link to={"/checkoutPremium"} className="text-decoration-none">
            <h2 className="text-center">GET</h2>
            <h2 className="text-center">PREMIUM</h2>
            <h2 className="text-center">NOW!</h2>
            </Link>
            </div>
            <button onClick={closeMsg} className="text-white btn-close">
              Ask me later
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PremiumMessage;
