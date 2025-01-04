import { useEffect, useState } from "react";
import { fetchStats } from "../services/statsServices";

interface Stats {
    totalUsers: number;
    totalPosts: number;
    totalComments: number;
}

export const useStats = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchStats();
                if (data) {
                    setStats(data);
                }
            } catch (err) {
                setError("Failed to fetch stats");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { stats, loading, error };
};
