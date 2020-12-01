import { useIdentifyLockerQuery } from "../generated/graphql";

export const useLockerId = (lockerId: number) => {
  const { data, error } = useIdentifyLockerQuery({
    variables: {
      lockerId,
    },
  });

  if (data?.identifyLocker?.errors) {
    console.log(data?.identifyLocker?.errors[0].message);
  }

  return data?.identifyLocker?.locker;
};
