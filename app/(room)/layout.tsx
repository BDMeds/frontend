import StreamVideoProvider from "@/lib/providers/stream-provider";

const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
};

export default Layout;
