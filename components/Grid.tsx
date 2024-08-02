import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

interface GridProps {
  views: number[];
}

const Grid = ({ views }: GridProps) => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWindowWidth(window.width);
      setWindowHeight(window.height);
    });
    return () => subscription?.remove();
  }, []);

  const calculateItemSize = useCallback(() => {
    const availableWidth = windowWidth;
    const numberPerRow = Math.ceil(Math.sqrt(views.length));
    const maxSizePerHeight = windowHeight / numberPerRow;
    const maxSizePerWidth = Math.floor(availableWidth / numberPerRow);
    const idealItemSize = Math.min(maxSizePerWidth, maxSizePerHeight);
    return idealItemSize;
  }, [windowWidth, windowHeight, views.length]);

  const calculateNumColumns = useCallback(() => {
    const itemSize = calculateItemSize();
    const numColumns = Math.floor(windowWidth / itemSize);
    return numColumns;
  }, [windowWidth, calculateItemSize]);

  const itemSize = useMemo(() => calculateItemSize(), [calculateItemSize]);
  const numColumns = useMemo(
    () => calculateNumColumns(),
    [calculateNumColumns]
  );

  const renderRow = useCallback(
    (rowIndex: number) => {
      const startIndex = rowIndex * numColumns;
      const endIndex = startIndex + numColumns;
      const rowData = views.slice(startIndex, endIndex);

      return (
        <View style={styles.row}>
          {rowData.map((_, index) => (
            <View
              key={`render-row-${index}`}
              style={[styles.item, { width: itemSize, height: itemSize }]}
            />
          ))}
        </View>
      );
    },
    [numColumns, itemSize]
  );

  const numRows = Math.ceil(views.length / numColumns);

  return (
    <View style={styles.container}>
      {Array.from({ length: numRows }).map((_, index) => renderRow(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    backgroundColor: "lightblue",
    margin: 1,
  },
});

export default Grid;
