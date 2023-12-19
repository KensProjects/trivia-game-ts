import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: { children: ReactNode }) {

    const queryClient = new QueryClient()
    
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="top-right"/>
            {children}
        </QueryClientProvider>
    )
}
