import { ChildrenProps } from "@/types";

const AuthLayout = ({ children }: ChildrenProps) => {
	return <div className='flex min-h-screen items-center justify-center bg-black'>{children}</div>;
};
export default AuthLayout;
