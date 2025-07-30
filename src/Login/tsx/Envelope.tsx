import { useState } from "react";

const Envelope = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <div
        style={{
          width: "200px",
          height: "120px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="src\Login\img\emaill.png"
          alt="Envelope"
          style={{
            width: "100%",
            height: "75%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>
    </div>
  );
};

export default Envelope;
