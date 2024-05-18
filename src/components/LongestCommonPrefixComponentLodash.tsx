import React, { useState } from "react";

const LongestCommonPrefixComponent: React.FC = () => {
  const [inputStrings, setInputStrings] = useState<string[]>([
    "flower",
    "flow",
    "flight",
  ]);
  const [commonPrefix, setCommonPrefix] = useState<string>("");

  const findCommonPrefix = () => {
    setCommonPrefix(longestCommonPrefix(inputStrings));
  };

  const longestCommonPrefix = (strs: string[]): string => {
    if (strs.length === 0) return "";

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
      while (strs[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === "") return "";
      }
    }

    return prefix;
  };

  return (
    <div>
      <h1>ค้นหา Prefix ที่ยาวที่สุด</h1>
      <div>
        <input
          type="text"
          value={inputStrings.join(",")}
          onChange={(e) => setInputStrings(e.target.value.split(","))}
        />
      </div>
      <button onClick={findCommonPrefix}>ค้นหา Prefix</button>
      {commonPrefix && (
        <div>
          <h2>Prefix ที่ยาวที่สุด: {commonPrefix}</h2>
        </div>
      )}
    </div>
  );
};

export default LongestCommonPrefixComponent;
