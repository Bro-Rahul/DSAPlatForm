import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { baseURL } from "@/http";
import { socialLogin } from "@/http/userHttp";

const options: NextAuthOptions = {
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account?.provider === "google" && profile) {
                const response = await socialLogin({
                    email: profile.email!,
                    username: profile.name!,
                    providers: "G",
                }, "google");

                token.user = response;
            } else if (account?.provider === "github" && profile) {
                const response = await socialLogin({
                    email: profile.email!,
                    username: profile.name!,
                    providers: "GH",
                }, "github");

                token.user = response;
            } else if (user) {
                // This is the response from your credentials authorize() function
                token.user = user as any; // Explicitly cast to UserType
            }

            return token;
        },

        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid email profile",
                },
            },
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch(`${baseURL}/users/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                const error = user.detail || "Login Failed Provide a valid credencials"
                throw new Error(error);
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    }
}

export default options;