// dev/vite.config.ts
import { defineConfig } from "file:///Users/yusenjeng/Code/shasta/node_modules/.pnpm/vite@4.3.9_@types+node@17.0.45/node_modules/vite/dist/node/index.js";
import solidPlugin from "file:///Users/yusenjeng/Code/shasta/node_modules/.pnpm/vite-plugin-solid@2.7.0_solid-js@1.7.5_vite@4.3.9/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import devtools from "file:///Users/yusenjeng/Code/shasta/node_modules/.pnpm/solid-devtools@0.26.1_@solidjs+meta@0.28.5_@solidjs+router@0.8.2_solid-js@1.7.5_vite@4.3.9/node_modules/solid-devtools/dist/vite.js";
var vite_config_default = defineConfig({
  plugins: [
    devtools({
      /* additional options */
      autoname: true,
      // e.g. enable autoname
      locator: {
        targetIDE: "vscode",
        componentLocation: true,
        jsxLocation: true
      }
    }),
    solidPlugin(),
    {
      name: "Reaplace env variables",
      transform(code, id) {
        if (id.includes("node_modules")) {
          return code;
        }
        return code.replace(/process\.env\.SSR/g, "false").replace(/process\.env\.DEV/g, "true").replace(/process\.env\.PROD/g, "false").replace(/process\.env\.NODE_ENV/g, '"development"').replace(/import\.meta\.env\.SSR/g, "false").replace(/import\.meta\.env\.DEV/g, "true").replace(/import\.meta\.env\.PROD/g, "false").replace(/import\.meta\.env\.NODE_ENV/g, '"development"');
      }
    }
  ],
  server: {
    port: 5e3
  },
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGV2L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3l1c2VuamVuZy9Db2RlL3NoYXN0YS9wYWNrYWdlcy9zb2xpZC11aS1zaGFzdGEvZGV2XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveXVzZW5qZW5nL0NvZGUvc2hhc3RhL3BhY2thZ2VzL3NvbGlkLXVpLXNoYXN0YS9kZXYvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3l1c2VuamVuZy9Db2RlL3NoYXN0YS9wYWNrYWdlcy9zb2xpZC11aS1zaGFzdGEvZGV2L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1zb2xpZCdcbmltcG9ydCBkZXZ0b29scyBmcm9tICdzb2xpZC1kZXZ0b29scy92aXRlJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgZGV2dG9vbHMoe1xuICAgICAgLyogYWRkaXRpb25hbCBvcHRpb25zICovXG4gICAgICBhdXRvbmFtZTogdHJ1ZSwgLy8gZS5nLiBlbmFibGUgYXV0b25hbWVcbiAgICAgIGxvY2F0b3I6IHtcbiAgICAgICAgdGFyZ2V0SURFOiAndnNjb2RlJyxcbiAgICAgICAgY29tcG9uZW50TG9jYXRpb246IHRydWUsXG4gICAgICAgIGpzeExvY2F0aW9uOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBzb2xpZFBsdWdpbigpLFxuICAgIHtcbiAgICAgIG5hbWU6ICdSZWFwbGFjZSBlbnYgdmFyaWFibGVzJyxcbiAgICAgIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29kZVxuICAgICAgICAgIC5yZXBsYWNlKC9wcm9jZXNzXFwuZW52XFwuU1NSL2csICdmYWxzZScpXG4gICAgICAgICAgLnJlcGxhY2UoL3Byb2Nlc3NcXC5lbnZcXC5ERVYvZywgJ3RydWUnKVxuICAgICAgICAgIC5yZXBsYWNlKC9wcm9jZXNzXFwuZW52XFwuUFJPRC9nLCAnZmFsc2UnKVxuICAgICAgICAgIC5yZXBsYWNlKC9wcm9jZXNzXFwuZW52XFwuTk9ERV9FTlYvZywgJ1wiZGV2ZWxvcG1lbnRcIicpXG4gICAgICAgICAgLnJlcGxhY2UoL2ltcG9ydFxcLm1ldGFcXC5lbnZcXC5TU1IvZywgJ2ZhbHNlJylcbiAgICAgICAgICAucmVwbGFjZSgvaW1wb3J0XFwubWV0YVxcLmVudlxcLkRFVi9nLCAndHJ1ZScpXG4gICAgICAgICAgLnJlcGxhY2UoL2ltcG9ydFxcLm1ldGFcXC5lbnZcXC5QUk9EL2csICdmYWxzZScpXG4gICAgICAgICAgLnJlcGxhY2UoL2ltcG9ydFxcLm1ldGFcXC5lbnZcXC5OT0RFX0VOVi9nLCAnXCJkZXZlbG9wbWVudFwiJylcbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTAwMCxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxvQkFBb0I7QUFDMVgsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxjQUFjO0FBRXJCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQTtBQUFBLE1BRVAsVUFBVTtBQUFBO0FBQUEsTUFDVixTQUFTO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxtQkFBbUI7QUFBQSxRQUNuQixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLElBQ1o7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTSxJQUFJO0FBQ2xCLFlBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixpQkFBTztBQUFBLFFBQ1Q7QUFDQSxlQUFPLEtBQ0osUUFBUSxzQkFBc0IsT0FBTyxFQUNyQyxRQUFRLHNCQUFzQixNQUFNLEVBQ3BDLFFBQVEsdUJBQXVCLE9BQU8sRUFDdEMsUUFBUSwyQkFBMkIsZUFBZSxFQUNsRCxRQUFRLDJCQUEyQixPQUFPLEVBQzFDLFFBQVEsMkJBQTJCLE1BQU0sRUFDekMsUUFBUSw0QkFBNEIsT0FBTyxFQUMzQyxRQUFRLGdDQUFnQyxlQUFlO0FBQUEsTUFDNUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
