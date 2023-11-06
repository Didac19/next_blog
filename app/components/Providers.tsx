'use client'

import { FC } from "react"
import { QueryClientProvider, QueryClient } from "react-query"
const queryClient = new QueryClient()
import { EdgeStoreProvider } from '../lib/edgestore';
interface ProvidersProps {
    children: React.ReactNode
}
const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <EdgeStoreProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </EdgeStoreProvider>)
}

export default Providers