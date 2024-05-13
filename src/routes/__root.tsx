import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type QueryClient } from '@tanstack/react-query';
import LogoBar from '@/components/LogoBar';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <LogoBar />
      <Outlet />
      {/* <TanStackRouterDevtools />
      <ReactQueryDevtools /> */}
    </>
  ),
});
