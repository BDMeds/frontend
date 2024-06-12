export const dataMutate = async (data: any) => {
  await new Promise((resolve) => setTimeout(() => resolve(data), 3000));
};
