import inputLoader from "./inputLoader";

export const loadData = async (): Promise<string[]> => {
  try {
    const data: Buffer = await inputLoader();
    const dataInString: string = data.toString();
    const parsed = dataInString.split("\r\n");

    return parsed;
  } catch (exception) {
    throw new Error(`Failed to load input data. ${exception.message}`);
  }
};

export const scanBoxId = () => {};

export const boxIdChecksum = () => {};
