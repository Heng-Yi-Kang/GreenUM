import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertCircle, ArrowRight, TreePine } from "lucide-react";
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.eventId;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { error: authError } = isLogin
                ? await signIn({ email, password })
                : await signUp({ email, password });
            if (authError)
                throw authError;
            // If we have an event ID, redirect back to events with that ID
            if (eventId) {
                navigate("/events", { state: { eventId } });
            }
            else {
                navigate("/events");
            }
        }
        catch (err) {
            setError(err.message || "An error occurred during authentication");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-[80vh] flex items-center justify-center p-4", children: _jsxs("div", { className: "max-w-md w-full bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 overflow-hidden transform transition-all", children: [_jsxs("div", { className: "bg-green-600 p-8 text-white relative h-32 flex flex-col justify-end", children: [_jsx("div", { className: "absolute top-4 right-4 opacity-20", children: _jsx(TreePine, { className: "w-20 h-20 rotate-12" }) }), _jsx("h2", { className: "text-2xl font-bold", children: isLogin ? "Welcome Back" : "Create Account" }), _jsx("p", { className: "text-green-50/80 text-sm mt-1", children: isLogin
                                ? "Sign in to continue to GreenUM"
                                : "Join our community of eco-enthusiasts" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-8 space-y-6", children: [error && (_jsxs("div", { className: "flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm animate-in fade-in slide-in-from-top-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 shrink-0" }), _jsx("span", { children: error })] })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-semibold text-gray-500 ml-1 uppercase tracking-wider", children: "Email Address" }), _jsxs("div", { className: "relative group", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: _jsx(Mail, { className: "h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" }) }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all", placeholder: "name@example.com" })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("label", { className: "text-xs font-semibold text-gray-500 ml-1 uppercase tracking-wider", children: "Password" }), _jsxs("div", { className: "relative group", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none", children: _jsx(Lock, { className: "h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" }) }), _jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all", placeholder: "your password" })] })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full relative group bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none", children: _jsxs("span", { className: "flex items-center justify-center gap-2", children: [loading
                                        ? "Processing..."
                                        : isLogin
                                            ? "Sign In"
                                            : "Create Account", !loading && (_jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" }))] }) }), _jsx("div", { className: "text-center pt-2", children: _jsx("button", { type: "button", onClick: () => setIsLogin(!isLogin), className: "text-sm font-medium text-gray-500 hover:text-green-600 transition-colors", children: isLogin
                                    ? "Don't have an account? Sign up"
                                    : "Already have an account? Sign in" }) })] })] }) }));
};
export default AuthPage;
