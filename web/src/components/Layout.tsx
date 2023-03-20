interface IProps {
  children: React.ReactNode;
}
export function Layout({ children }: IProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
  );
}
