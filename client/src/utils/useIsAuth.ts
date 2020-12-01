import { useCustomerQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isServer } from "./isServer";

const useIsAuth = () => {
  const { data, loading } = useCustomerQuery({
    skip: isServer(),
  });
  const router = useRouter();
  useEffect(() => {
    console.log(data);
    if (!loading && !data?.identifyCustomer?.customer?.custId) {
      if (router.pathname === "/cust/[id]") {
        router.replace("/login");
      } else {
        router.replace("/login?next=" + router.pathname);
      }
    }
  }, [loading, data, router]);

  return { data, loading };
};

export default useIsAuth;
