import { useState, useEffect } from "react";
import { Users } from 'app/types'

interface Props {
    searchVal: any,
    retrieve: any
}


const useSearchData = ({ searchVal, retrieve }: Props) => {
    const [filteredData, setFilteredData] = useState<any>([]);
    const [origData, setOrigData] = useState<Users[]>([]);
    const [searchIndex, setSearchIndex] = useState<Users[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const crawl = (user: any, allValues?: any) => {
            if (!allValues) allValues = [];
            for (var key in user) {
                if (typeof user[key] === "object") crawl(user[key], allValues);
                else allValues.push(user[key] + " ");
            }
            return allValues;
        };
        const fetchData = async () => {
            const users = retrieve;
            setOrigData(users);
            setFilteredData(users);
            const searchInd = users?.map((user: any) => {
                const allValues = crawl(user);
                return { allValues: allValues.toString() };
            });
            setSearchIndex(searchInd);
            if (users) setLoading(false);
        };
        fetchData();
    }, [retrieve]);

    useEffect(() => {
        if (searchVal) {
            const reqData = searchIndex.map((user: any, index) => {
                if (user.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0)
                    return origData[index];
                return null;
            });
            setFilteredData(
                reqData.filter(user => {
                    if (user) return true;
                    return false;
                })
            );
        } else setFilteredData(origData);
    }, [searchVal, origData, searchIndex]);

    return { filteredData, loading };
};

export default useSearchData