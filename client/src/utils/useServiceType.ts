import { useIdentifyServiceQuery } from "../generated/graphql";

export const useServiceType = (serviceId: number) => {
  const { data, error } = useIdentifyServiceQuery({
    variables: {
      serviceId,
    },
  });

  if (error) {
    return null;
  }

  return data?.identifyService?.service;
};
