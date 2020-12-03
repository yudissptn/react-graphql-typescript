import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CustomerOrderResponse } from "../generated/graphql";
import { Order } from "../generated/graphql";
import { NextPageContext } from "next";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL, // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true",
  },
  fetch,
  fetchOptions: { credentials: "include" },
});

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            customerOrder: {
              keyArgs: [],
              merge(
                existing: CustomerOrderResponse | undefined,
                incoming: CustomerOrderResponse
              ): CustomerOrderResponse {
                return {
                  ...incoming,
                  ogOrder: [
                    ...(incoming.ogOrder || []),
                    ...(existing?.ogOrder || []),
                  ],
                };
              },
            },
          },
        },
      },
    }),
    link: uploadLink,
  });

export const withApollo = createWithApollo(createClient);
