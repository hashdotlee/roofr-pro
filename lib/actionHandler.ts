import dbConnect from "./dbConnect";

type ActionResponse = {
  ok: boolean;
  data?: any;
  message: string;
};

type Action<T> = (args: T) => Promise<ActionResponse>;

export const ActionHandler =
  <T>(fn: Action<T>) =>
  async (args: T) => {
    try {
      await dbConnect();
      return await fn(args);
    } catch (error: any) {
      console.log(error);
      const message = error?.message || "Something went wrong!";
      throw new Error(message);
    }
  };
