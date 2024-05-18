import React, { useState } from "react";

const LongestCommonPrefixComponent: React.FC = () => {
  const [inputStrings, setInputStrings] = useState<string[]>([
    "flower",
    "flow",
    "flight",
  ]);

  return (
    <div>
      <h1>ค้นหา Prefix ที่ยาวที่สุด</h1>
    </div>
  );
};

export default LongestCommonPrefixComponent;
