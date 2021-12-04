import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify.js";

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // 1 hour as 3600 seconds return from spotify API
      refresToken: refreshedToken.refresh_token ?? token.refreshToken, //Replace if new one came back else fall back to old refresh token
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefresAccesTokenError",
    };
  }
};
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          userName: account.providerAccountId,
          accesTokenExpires: account.expires_at * 1000, //we are handling expiry times in Milisencons hence * 1000
        };
      }

      //Return previous token if the access token has not expired yet
      if (Date.now() < token.accesTokenExpires) {
        console.log("token not expired, EXISTING ACCES TOKEN IS VALID");
        return token;
      }

      //Access token has expired, refresh it
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
    },
  },
});
