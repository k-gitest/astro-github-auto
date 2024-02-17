/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      /* ts-jest の設定オブジェクトをここに記述 */
      useESM: true,
    }],
  },
};