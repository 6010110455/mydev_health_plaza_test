import React, { useState } from "react";
import _ from "lodash";

// ฟังก์ชัน longestCommonPrefix ที่เราเขียนเอง
const longestCommonPrefix = (strs: string[]): string => {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix!;
};

// ฟังก์ชัน longestCommonPrefix โดยใช้ lodash
const longestCommonPrefixLodash = (strs: string[]): string => {
  if (strs.length === 0) return "";

  return _.reduce(
    strs,
    (prefix: string, currentString: string) => {
      while (currentString.indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === "") return "";
      }
      return prefix;
    },
    strs[0]
  ); // เริ่มต้นค่าด้วย strs[0]
};

class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string) {
    let node = this.root;
    for (let char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
  }

  longestCommonPrefix(): string {
    let node = this.root;
    let prefix = "";
    while (node.children.size === 1 && !node.isEnd) {
      const child = Array.from(node.children.entries())[0];
      prefix += child[0];
      node = child[1];
    }
    return prefix;
  }
}

const LongestCommonPrefixComponent: React.FC = () => {
  const [inputStrings, setInputStrings] = useState<string[]>([
    "flower",
    "flow",
    "flight",
  ]);
  const [commonPrefix, setCommonPrefix] = useState<string>("");
  const [commonPrefixLodash, setCommonPrefixLodash] = useState<string>("");
  const [commonPrefixTrie, setCommonPrefixTrie] = useState<string>("");

  const findCommonPrefix = () => {
    console.time("Custom Longest Common Prefix");
    const prefix = longestCommonPrefix(inputStrings);
    console.timeEnd("Custom Longest Common Prefix");
    setCommonPrefix(prefix);

    console.time("Lodash Longest Common Prefix");
    const prefixLodash = longestCommonPrefixLodash(inputStrings);
    console.timeEnd("Lodash Longest Common Prefix");
    setCommonPrefixLodash(prefixLodash);

    console.time("Trie Longest Common Prefix");
    const trie = new Trie();
    for (let str of inputStrings) {
      trie.insert(str);
    }
    const prefixTrie = trie.longestCommonPrefix();
    console.timeEnd("Trie Longest Common Prefix");
    setCommonPrefixTrie(prefixTrie);
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
      <div>
        <h2>ผลลัพธ์จากฟังก์ชันที่เขียนเอง: {commonPrefix}</h2>
        <h2>ผลลัพธ์จาก lodash: {commonPrefixLodash}</h2>
      </div>
    </div>
  );
};

export default LongestCommonPrefixComponent;
