import  patchSettingSetter  from "./Setter";
export const applyInjections = (): void => {
  patchSettingSetter();
};

export default {applyInjections}
