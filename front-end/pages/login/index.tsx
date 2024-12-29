import Header from "@/components/header";
import UserLoginForm from "@/components/user/UserLoginForm";
import Head from "next/head";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main className="p-6 bg-gradient-to-b from-gray-800 to-gray-600 min-h-screen items-center flex flex-col">
                <section className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                    <UserLoginForm />
                </section>
            </main>
        </>
    );
};

export default Login;