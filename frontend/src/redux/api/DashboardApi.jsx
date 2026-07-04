import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const DashboardApi = createApi({
    reducerPath:"DashboardApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        // dashboard stats
        GetDashboardStats:builder.query({
            query:()=>"/api/analytics/dashboard/stats"
        })
    })
})

export const {useGetDashboardStatsQuery} = DashboardApi
