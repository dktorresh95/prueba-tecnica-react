import React from "react";
import { FixedSizeList as List } from "react-window";

export const Filter = ({ tags , setPost}) => {
  const Row = ({ index, style }) => (
    <div className="post">
      {tags.map((tag) => (
        <span onClick={() => fetchDataPostByTag(tag)}>{tag} </span>
      ))}
    </div>
  );
  const fetchDataPostByTag = async (tag) => {
    try {
      const response = await fetch(`https://dummyapi.io/data/v1/tag/${tag}/post`, {
        method: "GET",
        headers: {
          "app-id": "631251d815c778ad0b7301b6 ",
        },
      });
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const result = await response.json();
      setPost(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <List width='100%' height={200} itemCount={tags.length} itemSize={120}>
        {Row}
      </List>
    </div>
  );
};
