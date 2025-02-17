import { useEffect, useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])
    const [error, setError] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(url, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url, {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
                }
            });
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};
export default useFetch;
