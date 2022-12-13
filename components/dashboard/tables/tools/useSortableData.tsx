import React from 'react';
import { useState } from 'react'
import { Users, Product, Adoptions } from 'app/types'
interface Confi {
  key?: string | '',
  direction?: string | ''
}


const useSortableData = (items: any, config: Confi = { key: "", direction: "" }) => {
  const [sortConfig, setSortConfig] = useState<Confi>(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = items;

    if (sortConfig && sortConfig.key && sortConfig.direction) {
      // let keys = sortConfig.key as string
      // if (sortConfig.key != undefined) {
      //   result = obj2[sortConfig.key as keyof typeof a];
      // }
      sortableItems.sort((a: any, b: any) => {

        if (typeof (a[sortConfig.key as keyof typeof a]) === "string") {
          if ((a[sortConfig.key as keyof typeof a]).toLowerCase() < (b[sortConfig.key as keyof typeof b]).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if ((a[sortConfig.key as keyof typeof a]).toLowerCase() > (b[sortConfig.key as keyof typeof b]).toLowerCase()) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        } else {
          if ((a[sortConfig.key as keyof typeof a]) < (b[sortConfig.key as keyof typeof b])) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if ((a[sortConfig.key as keyof typeof a]) > (b[sortConfig.key as keyof typeof b])) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }



      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};
export default useSortableData