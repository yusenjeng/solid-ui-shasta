import { defineConfig, Options } from 'tsup'

export default defineConfig(config => {
  const watching = !!config.watch
  const inputPath = 'src/index.tsx'

  return {
    clean: true,
    target: 'esnext',
    format: 'esm',
    entry: [inputPath],
    dts: inputPath,
  } satisfies Options
})

// export default defineConfig(
//   {
//     entry: 'src/index.tsx',
//     devEntry: true,
//   },
//   {
//     // Enable this to write export conditions to package.json
//     // writePackageJson: true,
//     dropConsole: true,
//     cjs: true,
//   },
// )
