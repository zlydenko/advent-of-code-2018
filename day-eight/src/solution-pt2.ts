import { Tree } from "./solution-pt1";

/* example
2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
A 2 3 [1,1,2] -> B,B,C -> 33 + 33 + 0 -> 66
  B 0 3 [10,11,12] -> no children, value is sum of metadata -> 33
  C 1 1 [2] -> idx 2 -> no child with this idx -> value is 0
    D 0 1 [99] -> no ch., value is sum of metadata -> 99
*/

export const getRootNodeValue = (tree: Tree): number => {
  return 0;
};
