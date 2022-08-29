import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiData = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001"}),
    endpoints: build => ({
        getData: build.query({
            query: (url) => `/users?${url}`
        }),
        login: build.mutation({
            query: data => ({
                url: "/login",
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: data
            })
        })
    }),
})

export const { useGetDataQuery, useLoginMutation } = apiData